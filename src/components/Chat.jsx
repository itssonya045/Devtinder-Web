import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { Base_URL } from "../utils/constant";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchMessage = async () => {
    try {
      const res = await axios.get(Base_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = res?.data?.messages?.map((msg) => ({
        senderId: msg?.senderId?._id,
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg?.text,
      }));

      setMessages(chatMessages || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, [targetUserId]);

  useEffect(() => {
    if (!targetUserId || !user?._id) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user.firstName,
      targetUserId,
      userId: userId,
    });

    socket.on("messageReceived", ({ text, firstName, senderId }) => {
      setMessages((prev) => [...prev, { firstName, text, senderId }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [targetUserId, user]);

  const handleSendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      senderId: userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-base-200 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-base-300/80 backdrop-blur-md border border-base-100/40 rounded-2xl shadow-xl flex flex-col h-[75vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-base-100/40">
          <h1 className="text-xl font-semibold">💬 Chat</h1>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {messages.map((msg, index) => {
            const isMe = msg.senderId === userId;

            return (
              <div
                key={index}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-5 py-3 rounded-2xl shadow-md
                  ${
                    isMe
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-base-100 text-base-content rounded-bl-none"
                  }`}
                >
                  {!isMe && (
                    <div className="text-xs opacity-60 mb-1">
                      {msg.firstName} {msg.lastName}
                    </div>
                  )}
                  <div className="text-sm">{msg.text}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-base-100/40 flex items-center gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-base-100 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            onClick={handleSendMessage}
            className="px-6 py-2 rounded-xl bg-primary text-white font-medium hover:scale-105 active:scale-95 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

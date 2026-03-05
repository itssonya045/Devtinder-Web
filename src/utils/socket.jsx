import { io } from "socket.io-client";
import { Base_URL } from "./constant";

export const createSocketConnection = () => {
    return io(Base_URL, {
        withCredentials: true,
    });
}
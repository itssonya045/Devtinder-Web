 import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/feed"
import { Connection } from "./components/Connection"
import Request from "./components/Request"
import Chat from "./components/Chat"
function App() {
  

  return (
    <Provider store={appStore}>
   <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element ={<Body/>}>
          <Route path="/" element={<Feed/>}></Route>
         <Route path="/login" element={<Login/>}></Route>
         <Route path="/profile" element={<Profile/>}></Route>
         <Route path="/connections" element={<Connection/>}></Route>
         <Route path="/requests" element={<Request/>}></Route>
         <Route path="/chat/:targetUserId" element={<Chat/>}></Route>
      </Route>
    </Routes>
   </BrowserRouter>
   </Provider>
  )
}

export default App

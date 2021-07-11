import React from "react";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import http from "../services/httpService";
import userService from "../services/userService";
import "./messenger.css";
import ChatMenu from "../component/chatMenu/ChatMenu";
import Chat from "../component/chatComponent/Chat";

export default function Messenger({ socket }) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const user = userService.getCurrentUser();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await http.get("conversation/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    conversations?.forEach((c) =>
      socket?.current.emit("join-room", c.meetingId, user._id)
    );
  }, [conversations, user._id, socket]);

  const handleCurrentState = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <div className="messenger">
      <div className="messengerWrapper">
        <ChatMenu
          conversations={conversations}
          user={user}
          onChange={handleCurrentState}
        />
        {currentChat ? (
          <Chat chat={currentChat} user={user} socket={socket} />
        ) : (
          <span className="noConversation">
            Open a conversation to start chat
          </span>
        )}
      </div>
    </div>
  );
}

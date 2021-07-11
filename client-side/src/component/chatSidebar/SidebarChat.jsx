import React from "react";
import { useState, useEffect } from "react";
import http from "../../services/httpService";
import "./sidebarchat.css";

function SidebarChat({ conversation, currentUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const participantsId = conversation.participants.filter((p) => {
      return p !== currentUser._id;
    });
    const getUser = async (id) => {
      const res = await http.get("user/" + id);
      return res.data;
    };
    let participantsName = [];
    participantsId.map(async (id) => {
      const user = await getUser(id);
      participantsName.push(user);
      setUsers(participantsName);
      return user;
    });
  }, [currentUser, conversation]);

  return (
    <div className="sidebarChat">
      <div className="info">
        <h2>{conversation.meetingName}</h2>
      </div>
    </div>
  );
}

export default SidebarChat;

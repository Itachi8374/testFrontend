import React from "react";
import { useState, useEffect, useRef } from "react";
import http from "../../services/httpService";
import { format } from "timeago.js";
import "./chat.css";

function Chat({ chat, user, socket }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await http.get("message/" + chat.meetingId);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [chat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    setArrivalMessage(null);
  }, [arrivalMessage]);

  useEffect(() => {
    socket?.current.on("createMessage", (message) => {
      setArrivalMessage({
        meetingId: message.meetingId,
        senderId: message.senderId,
        senderName: message.senderName,
        text: message.text,
        createdAt: Date.now(),
      });
    });
  }, [setArrivalMessage, socket]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      meetingId: chat.meetingId,
      senderId: user._id,
      senderName: user.name,
      text: newMessage,
    };

    socket?.current.emit("message", message);

    try {
      const res = await http.post("message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="chat">
      <div className="header">
        <h3>{chat.meetingName}</h3>
      </div>
      <div className="body">
        {messages.map((m, index) => {
          return (
            <div ref={scrollRef} key={index}>
              <p
                className={
                  user._id === m.senderId ? "message receiver" : "message"
                }
              >
                <span className="name">{m.senderName.toUpperCase()}</span>
                {m.text}
                <span className="timestamp">{format(m.createdAt)}</span>
              </p>
            </div>
          );
        })}
      </div>
      <div className="footer">
        <form>
          <input
            type="text"
            placeholder="Type a new message"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button
            type="submit"
            className="btn  btn-dark"
            onClick={handleSubmit}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;

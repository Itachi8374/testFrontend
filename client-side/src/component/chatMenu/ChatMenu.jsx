import React from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SidebarChat from "../chatSidebar/SidebarChat";
import "./chatmenu.css";

function ChatMenu({ conversations, user, onChange }) {
  return (
    <div className="sidebar">
      <div className="menu_header">
        <span>
          <h3>
            Chats
            <span>
              <ArrowDropDownIcon />
            </span>
          </h3>
        </span>
      </div>
      <div className="chats">
        {conversations.map((c) => (
          <div onClick={() => onChange(c)} key={c._id}>
            <SidebarChat conversation={c} currentUser={user} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatMenu;

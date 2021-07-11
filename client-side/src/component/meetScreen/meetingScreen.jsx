import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import StopScreenShareIcon from "@material-ui/icons/StopScreenShare";
import PanToolIcon from "@material-ui/icons/PanTool";
import ChatIcon from "@material-ui/icons/Chat";
import CallIcon from "@material-ui/icons/Call";
import { IconButton } from "@material-ui/core";
import Chat from "../chatComponent/Chat";
import Messenger from "../../chat/Messenger";
import "./meet.css";

class MeetingScreen extends Component {
  domain = "meet.jit.si";
  api = {};
  chat_prop = {};
  user_prop = {};
  constructor(props) {
    super(props);
    let token = localStorage.getItem("token");
    const user = jwtDecode(token);
    token = localStorage.getItem("meet-token");
    const meet = jwtDecode(token);
    this.state = {
      room: meet.id,
      user: {
        name: user.name,
      },
      isAudioMuted: false,
      isVideoMuted: false,
      isScreenShare: false,
      isHandRaise: false,
      isChat: false,
    };
    this.chat_prop.meetingId = meet.id;
    this.chat_prop.meetingName = meet.name;
    this.user_prop._id = user._id;
    this.user_prop.name = user.name;
  }

  startMeet = () => {
    const options = {
      roomName: this.state.room,
      width: "100%",
      height: "100%",
      configOverwrite: {
        prejoinPageEnabled: false,
        startWithVideoMuted: true,
        startWithAudioMuted: true,
      },
      interfaceConfigOverwrite: {
        filmStripOnly: false,
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        DEFAULT_REMOTE_DISPLAY_NAME: "New User",
        TOOLBAR_BUTTONS: [],
      },
      parentNode: document.querySelector("#jitsi-iframe"),
      userInfo: {
        displayName: this.state.user.name,
      },
    };
    this.api = new window.JitsiMeetExternalAPI(this.domain, options);

    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus,
      screenSharingStatusChanged: this.handleScreenShare,
    });
  };

  handleClose = () => {
    console.log("handleClose");
  };

  handleParticipantLeft = async (participant) => {
    console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
  };

  handleParticipantJoined = async (participant) => {
    console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
  };

  handleVideoConferenceJoined = async (participant) => {
    console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await this.getParticipants();
  };

  handleVideoConferenceLeft = () => {
    console.log("handleVideoConferenceLeft");
    // localStorage.removeItem("meet-token");
    // window.location = "/";
  };

  handleMuteStatus = (audio) => {
    console.log("handleMuteStatus", audio); // { muted: true }
  };

  handleVideoStatus = (video) => {
    console.log("handleVideoStatus", video); // { muted: true }
  };

  handleScreenShare = (screen) => {
    console.log("handleScreenShare", screen);
  };

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500);
    });
  }

  handleChat = () => {
    this.setState({ isChat: !this.state.isChat });
  };

  executeCommand(command) {
    this.api.executeCommand(command);
    if (command === "hangup") {
      localStorage.removeItem("meet-token");
      window.location = "/chats";
    }

    if (command === "toggleAudio") {
      this.setState({ isAudioMuted: !this.state.isAudioMuted });
    }

    if (command === "toggleVideo") {
      this.setState({ isVideoMuted: !this.state.isVideoMuted });
    }

    if (command === "toggleShareScreen") {
      this.setState({ isScreenShare: !this.state.isScreenShare });
    }

    if (command === "toggleRaiseHand") {
      this.setState({ isHandRaise: !this.state.isHandRaise });
    }
  }

  componentDidMount() {
    if (window.JitsiMeetExternalAPI) {
      this.startMeet();
    } else {
      alert("JitsiMeetExternalAPI not loaded");
    }
  }

  render() {
    console.log("meetingscreen", this.state);
    return (
      <div>
        <div className="container_div">
          <div class="hide">
            {this.state.isChat && <Messenger socket={this.props.socket} />}
          </div>
          {this.state.isChat && (
            <Chat
              className="container_chat"
              chat={this.chat_prop}
              user={this.user_prop}
              socket={this.props.socket}
            />
          )}
          <div id="jitsi-iframe"></div>
        </div>
        <nav className="navbar fixed-bottom navbar-light ">
          <div className="toolbar">
            <IconButton onClick={() => this.executeCommand("toggleAudio")}>
              {!this.state.isAudioMuted && (
                <MicIcon style={{ color: "white" }} />
              )}
              {this.state.isAudioMuted && (
                <MicOffIcon style={{ color: "white" }} />
              )}
            </IconButton>

            <IconButton onClick={() => this.executeCommand("toggleVideo")}>
              {!this.state.isVideoMuted && (
                <VideocamIcon style={{ color: "white" }} />
              )}
              {this.state.isVideoMuted && (
                <VideocamOffIcon style={{ color: "white" }} />
              )}
            </IconButton>

            <IconButton
              onClick={() => this.executeCommand("toggleShareScreen")}
            >
              {!this.state.isScreenShare && (
                <ScreenShareIcon style={{ color: "white" }} />
              )}
              {this.state.isScreenShare && (
                <StopScreenShareIcon style={{ color: "white" }} />
              )}
            </IconButton>

            <IconButton onClick={() => this.executeCommand("toggleRaiseHand")}>
              <PanToolIcon
                style={
                  this.state.isHandRaise
                    ? { color: "green" }
                    : { color: "white" }
                }
              />
            </IconButton>

            <IconButton onClick={this.handleChat}>
              <ChatIcon style={{ color: "white" }} />
            </IconButton>

            <IconButton onClick={() => this.executeCommand("hangup")}>
              <CallIcon style={{ color: "red" }} />
            </IconButton>
          </div>
        </nav>
      </div>
    );
  }
}

export default MeetingScreen;

// class MeetinScreen extends Component {
//   state = {};
//   componentDidMount() {
//     let token = localStorage.getItem("token");
//     const user = jwtDecode(token);
//     token = localStorage.getItem("meet-token");
//     const meet = jwtDecode(token);
//     console.log(user, meet);
//     this.setState({

//     })
//   }
//   render() {
//     return <h1>Meeting Joined</h1>;
//   }
// }

// export default MeetinScreen;

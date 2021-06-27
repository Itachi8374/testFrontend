import React, { Component } from "react";
import jwtDecode from "jwt-decode";

class MeetingScreen extends Component {
  domain = "meet.jit.si";
  api = {};

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
    };
  }

  startMeet = () => {
    const options = {
      roomName: this.state.room,
      width: "100%",
      height: 500,
      configOverwrite: { prejoinPageEnabled: false },
      interfaceConfigOverwrite: {
        // overwrite interface properties
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
    localStorage.removeItem("meet-token");
    window.location = "/";
  };

  handleMuteStatus = (audio) => {
    console.log("handleMuteStatus", audio); // { muted: true }
  };

  handleVideoStatus = (video) => {
    console.log("handleVideoStatus", video); // { muted: true }
  };

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500);
    });
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
        <header className="nav-bar">
          <p className="item-left heading">Jitsi React</p>
        </header>
        <div id="jitsi-iframe"></div>
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

import React, { useState, useEffect, useRef } from 'react';
import Talk from 'talkjs';
import axios from 'axios';
import '../../style/user/user-dashboard.css';

export default function UserConnect() {
  const [url, setUrl] = useState('');
  const [talkLoaded, markTalkLoaded] = useState(false);
  const [activeChatboxIndex, setActiveChatboxIndex] = useState(0);
  const chatboxEl = useRef();
  const [isMounted, setIsMounted] = useState(false);
  const [userData, setUserData] = useState({});
  const [otherUsers, setOtherUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);


  useEffect(() => {
  async function fetchData() {
    const response = await fetch('http://localhost:4444/user/viewapts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: null,
    });
    const data = await response.json();
    setUserData(data);
  }

  async function loadTalkJS() {
    await Talk.ready;
    markTalkLoaded(true);
  }

  fetchData();
  loadTalkJS();
}, []);

useEffect(() => {
  async function setupChat() {
    await waitUntil(() => userData.length > 0);

    const firstUser = userData[0];
    setOtherUsers({
      id: '10',
      name: firstUser.HCP,
      email: 'test',
      photoUrl: 'anthony.jpeg',
      welcomeMessage: 'Hello!',
      role: 'default'
    });
  }

  if (talkLoaded && userData.length > 0) {
    setupChat();
  }
}, [talkLoaded, userData]);



function waitUntil(condition) {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (condition()) {
        clearInterval(intervalId);
        resolve();
      }
    }, 100);
  });
}

    useEffect(() => {
    async function setCurrent(){
      await waitUntil(() => userData.length > 0);
      setCurrentUser({
        id: '10912',
        name: 'Anthony Smith',
        email: userData[0].user,
        photoUrl: 'anthony.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default'
      });
    }

    setCurrent();
    }, [userData]);

    useEffect(() => {
    if (talkLoaded && otherUsers.length > 0) {
      const session = new Talk.Session({
        appId: 'tW54Iuga',
        me: new Talk.User(currentUser),
      });

      const otherUserObj = new Talk.User(otherUsers);
      const currentUserObj = new Talk.User(currentUser);

      console.log("HERE", otherUserObj, currentUserObj)
      const conversationId = Talk.oneOnOneId(currentUser, otherUsers);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUsers);
      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);


      const iframe = chatboxEl.current.querySelector('iframe');
       if (iframe) {
         iframe.style.width = '100%';
         iframe.style.height = '730px';
       }

      return () => session.destroy();

      console.log(chatbox.current)
      return () => session.destroy();
    }
    }, [talkLoaded, otherUsers, currentUser]);


  const handleClick = async () => {
    axios.post("http://localhost:4444/zoomidUser")
      .then(res => {
        setUrl(res.data)
      })
      .catch(err => {
        console.log(err)
      });
    window.open(url, '_blank');
  };







return (
  <div className="hero-section">
    <div className="hero-content">
      <nav className="navbar" style={{ marginLeft: '20px', width: '1740px' }}>
        <h1 className="nav-logo">EasySante</h1>
        <ul className="nav-links">
          <a href="/user-dashboard">Dashboard</a>
          <a href="/user-connect">Connect</a>
          <a href="/user-appointment">Appointments</a>
          <a href="/user-profile">Profile</a>
        </ul>
      </nav>
      <div className="chatbox-container">
        <div className="users-container">
          <h2>Choose a user to chat with:</h2>
          <ul>
          </ul>
        </div>
        <div className="chatbox-wrapper">
          <div ref={chatboxEl} />
        </div>
      </div>
      <button onClick={handleClick} className="button-21" style={{ position: 'absolute', bottom: '160px', right: '840px' }}>
        Join Meeting
      </button>
    </div>
  </div>
);



  };

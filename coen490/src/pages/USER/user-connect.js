import React, { useState, useEffect, useRef } from 'react';
import Talk from 'talkjs';
import axios from 'axios';
import '../../style/user/user-dashboard.css';
import logo from '../../style/490LogoWhite.png';


export default function UserConnect() {
  const [url, setUrl] = useState('');
  const [talkLoaded, markTalkLoaded] = useState(false);
  const [activeChatboxIndex, setActiveChatboxIndex] = useState(0);
  const chatboxes = useRef([]);
  const chatboxEl = useRef();
  const [mountedChatboxes, setMountedChatboxes] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [userData, setUserData] = useState({});
  const [otherUsers, setOtherUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

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


    const newUsers = userData.map((user, index) => {
      console.log(typeof user.HCP);
      return {
        id: String(user.HCP),
        name: user.HCP,
        email: 'test',
        photoUrl: 'anthony.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default'
      };
    });
    setOtherUsers(newUsers);
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

      console.log("HERE", otherUsers, currentUser)
      const conversations = otherUsers.map((otherUser) => {
        const conversation = session.getOrCreateConversation(Talk.oneOnOneId(currentUser, otherUser));
        conversation.setParticipant(new Talk.User(currentUser));
        conversation.setParticipant(new Talk.User(otherUser));
        return conversation;
      });

      chatboxes.current = conversations.map((conversation) => {
        const chatbox = session.createChatbox();
        chatbox.select(conversation);
        return chatbox;
      });
      console.log(chatboxes.current)
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

  const handleUserClick = (index) => {
    setActiveChatboxIndex(index);
  }



  useEffect(() => {
     if (chatboxes.current.length > 0 && chatboxEl.current) {
       chatboxes.current.forEach((chatbox, index) => {
         if (index === activeChatboxIndex) {
           if (!mountedChatboxes.includes(chatbox)) {
             chatbox.mount(chatboxEl.current);
             setMountedChatboxes([...mountedChatboxes, chatbox]);
           }
         } else {
           if (mountedChatboxes.includes(chatbox)) {
             setMountedChatboxes(mountedChatboxes.filter(cb => cb !== chatbox));
           }
         }
       });
     }
   }, [chatboxes.current, activeChatboxIndex, chatboxEl.current, mountedChatboxes]);



return (
  <div className="hero-section">
    <div className="hero-content">
      <nav className="navbar" style={{ marginLeft: '20px', width: '1740px' }}>
        <img className="nav-logo" src={logo}/>
        <ul className="nav-links">
          <a href="/user-dashboard">Dashboard</a>
          <a href="/user-connect">Connect</a>
          <a href="/user-view-apt">View Appointments</a>
          <a href="/user-book-apt">Book Appointments</a>
          <a href="/user-profile">Profile</a>
        </ul>
      </nav>
      <div className="chatbox-container">
        <div className="users-container">
          <h2>Choose a user to chat with:</h2>
          <ul>
            {otherUsers.map((user, index) => (
              <li key={user.id}>
                <button onClick={() => setActiveChatboxIndex(index)}>
                  {user.name}
                </button>
              </li>
            ))}
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

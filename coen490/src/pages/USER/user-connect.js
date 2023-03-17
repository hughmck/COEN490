import React, { useState, useEffect, useRef } from 'react';
import Talk from 'talkjs'
import axios from 'axios';
import '../../style/user/user-dashboard.css';


export default function UserConnect() {
  const [url, setUrl] = useState('');
  const chatboxEl = useRef();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
   Talk.ready.then(() => markTalkLoaded(true));

   if (talkLoaded) {
     const currentUser = new Talk.User({
       id: '10',
       name: 'Henry Mill',
       email: 'henrymill@example.com',
       photoUrl: 'henry.jpeg',
       welcomeMessage: 'Hello!',
       role: 'default',
     });

     const otherUser = new Talk.User({
       id: '20',
       name: 'Jessica Well',
       email: 'jessicawells@example.com',
       photoUrl: 'jessica.jpeg',
       welcomeMessage: 'Hello!',
       role: 'default',
     });

     const session = new Talk.Session({
       appId: 'tW54Iuga',
       me: currentUser,
     });

     const conversationId = Talk.oneOnOneId(currentUser, otherUser);
     const conversation = session.getOrCreateConversation(conversationId);
     conversation.setParticipant(currentUser);
     conversation.setParticipant(otherUser);
     const chatbox = session.createChatbox();
     chatbox.select(conversation);
     chatbox.mount(chatboxEl.current);


     const iframe = chatboxEl.current.querySelector('iframe');
      if (iframe) {
        iframe.style.width = '100%';
        iframe.style.height = '730px';
      }

     return () => session.destroy();
   }
  }, [talkLoaded]);


  const handleClick = async () => {
    axios.post("http://localhost:4444/zoomidHCP")
      .then(res => {
        setUrl(res.data)
      })
      .catch(err => {
        console.log(err)

      })
      console.log(url)
    window.open(url, '_blank');
  };


  return (
    <>
    <main className="hero-section">
  <section className="container">
    <div className="hero-content">
      <nav className="navbar">
        <h1 className="nav-logo">EasySante</h1>
        <ul className="nav-links">
          <a href="/user-dashboard">Dashboard</a>
          <a href="/user-connect">Connect</a>
          <a href="/user-view-apt">View Appointments</a>
          <a href="/user-book-apt">Book Appointments</a>
          <a href="/user-profile">Profile</a>
        </ul>
      </nav>
    <div ref={chatboxEl} />
      <button className="button" onClick={handleClick} style={{ position: 'absolute', bottom: '685px', right: '580px' }}>Join Meeting</button>
    </div>
    </section>
    </main>
    </>
  );
};

import '../../style/HCP/HCPconnect.css'
import React, { useState, useEffect, useRef } from 'react';
import Talk from 'talkjs'
import axios from 'axios';

import { useQuery } from 'react-query';
import logo from '../../style/490LogoWhite.png';


export default function HCPConnect() {

const [url, setUrl] = useState('');
const chatboxEl = useRef();
const [userData, setUserData] = useState([])
const [talkLoaded, markTalkLoaded] = useState(false);


const fetchUserData = async () => {
  const data = await axios.post('http://localhost:4444/hcp/viewapts');
  setUserData(data)
  return data;
};


 const { status, isStale, isFetching, error, data } = useQuery(
  'user data',
  fetchUserData
);

useEffect(() => {
 Talk.ready.then(() => markTalkLoaded(true));
 if (talkLoaded && data) {
      let fullName;
      let id;
      let welcome;
    if (!data.data || data.data.length === 0) {
      fullName = 'no match';
      id = '11';
      welcome = 'You have no appointments booked'
    } else {
      fullName = 'Demo Capstone';
      id = '12';
      welcome ='Talk to Your Client Here!'
    }

   const otherUser = new Talk.User({
     id: '20',
     name: fullName,
     email: 'test',
     photoUrl: 'henry.jpeg',
     welcomeMessage: welcome,
     role: 'default',
   });

   const currentUser = new Talk.User({
     id: id,
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
}, [talkLoaded, isFetching]);


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
      <div className="hero-content">
        <nav className="navbar" style={{marginLeft: "20px", width: "1740px" }}>
        <img className="nav-logo" src={logo}/>
          <ul className="nav-links">
            <a href="/HCP-dashboard">Dashboard</a>
            <a href="/HCP-connect">Connect</a>
            <a href="/HCP-patient-list">View Appointments</a>
            <a href="/HCP-profile">Profile</a>
          </ul>
        </nav>
    <div ref={chatboxEl} />
      <button onClick={handleClick} class='button-21' style={{ position: 'absolute', bottom: '100px', right: '840px' }}>Join Meeting</button>
      </div>
      </main>
    </>
  );
};

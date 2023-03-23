import '../../style/HCP/HCPconnect.css'
import React, { useState, useEffect, useRef } from 'react';
import Talk from 'talkjs'
import axios from 'axios';

import { useQuery } from 'react-query';
import logo from '../../style/490LogoWhite.png';


export default function UserConnect() {

const [url, setUrl] = useState('');
const chatboxEl = useRef();
const [userData, setUserData] = useState([])
const [talkLoaded, markTalkLoaded] = useState(false);


const fetchUserData = async () => {
  const data = await axios.post('http://localhost:4444/user/viewapts');
  setUserData(data)
  return data;
};


 const { status, isStale, isFetching, error, data } = useQuery(
  'user data',
  fetchUserData
);

useEffect(() => {
  console.log("HERE",url)
 Talk.ready.then(() => markTalkLoaded(true));
 if (talkLoaded && data) {
      console.log(data)
      let fullName;
      let id;
      let welcome;
    if (!data.data || data.data.length === 0) {
      fullName = 'no match';
      id = '21';
      welcome = 'connect with an HCP to start your converstation!'
    } else {
      fullName = data.data[0].HCPfirstname + ' ' + data.data[0].HCPlastname;
      id = '20';
      welcome ='Talk to Your HCP'
    }

   const currentUser = new Talk.User({
     id: id,
     name: fullName,
     email: 'test',
     photoUrl: 'henry.jpeg',
     welcomeMessage: welcome,
     role: 'default',
   });

   const otherUser = new Talk.User({
     id: '12',
     name: fullName,
     email: 'any',
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
      if(!url){
      setUrl(res.data)
      console.log(res.data)
    }
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
          <nav className="navbar" style={{ marginLeft: "20px", width: "1740px" }}>
            <img className="nav-logo" src={logo}/>
            <ul className="nav-links">
              <a href="/user-dashboard">Dashboard</a>
              <a href="/user-connect">Connect</a>
              <a href="/user-view-apt">View Appointments</a>
              <a href="/user-book-apt">Book Appointments</a>
              <a href="/user-profile">Profile</a>
            </ul>
          </nav>
    <div ref={chatboxEl} />
      <button onClick={handleClick} class='button-21' style={{ position: 'absolute', bottom: '100px', right: '840px' }}>Join Meeting</button>
      </div>
      </main>
    </>
  );
};

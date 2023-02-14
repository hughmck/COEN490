import '../../style/HCP/HCPconnect.css'
import React, { useState, useEffect, useRef } from 'react';
import Talk from 'talkjs'
import axios from 'axios';

export default function HCPConnect() {
const [url, setUrl] = useState('');
const chatboxEl = useRef();

// wait for TalkJS to load
const [talkLoaded, markTalkLoaded] = useState(false);

useEffect(() => {
 Talk.ready.then(() => markTalkLoaded(true));

 if (talkLoaded) {
   const otherUser = new Talk.User({
     id: '10',
     name: 'Henry Mill',
     email: 'henrymill@example.com',
     photoUrl: 'henry.jpeg',
     welcomeMessage: 'Hello!',
     role: 'default',
   });

   const currentUser = new Talk.User({
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
  <div ref={chatboxEl} />
    <button onClick={handleClick} style={{ position: 'absolute', bottom: '685px', right: '580px' }}>Join Meeting</button>
  </>
);
};

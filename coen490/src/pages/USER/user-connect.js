import React, { useState, useEffect, useRef } from 'react';
import Talk from 'talkjs'
import axios from 'axios';

export default function UserConnect() {
  const [url, setUrl] = useState('');

  const chatboxEl = useRef();

 // wait for TalkJS to load
 const [talkLoaded, markTalkLoaded] = useState(false);

 useEffect(() => {
   Talk.ready.then(() => markTalkLoaded(true));

   if (talkLoaded) {
     const currentUser = new Talk.User({
       id: '1',
       name: 'Henry Mill',
       email: 'henrymill@example.com',
       photoUrl: 'henry.jpeg',
       welcomeMessage: 'Hello!',
       role: 'default',
     });

     const otherUser = new Talk.User({
       id: '2',
       name: 'Jessica Wells',
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

     return () => session.destroy();
   }
 }, [talkLoaded]);

 return <div ref={chatboxEl} />;

  const handleClick = async () => {
    axios.post("http://localhost:4444/zoomid")
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
    <div>
      <button onClick={handleClick}>Join Meeting</button>
    </div>
  );
};

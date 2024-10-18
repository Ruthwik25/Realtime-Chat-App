import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase.js';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      if (!currentUser || !currentUser.uid) return; // Check if currentUser exists and has uid
      try {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
          if (doc.exists()) {
            setChats(doc.data());
          } else {
            console.log("No chat data found for user");
            setChats([]); // Reset chats if no data is found
          }
        });
        return () => unsub();
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    currentUser && currentUser.uid && getChats();
  }, [currentUser]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {chats && Object.keys(chats).length > 0 ? (
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img src={chat[1].userInfo?.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{chat[1].userInfo?.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
          ))
      ) : (
        <p>No chats available</p>
      )}
    </div>
  );
};

export default Chats;

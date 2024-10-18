import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { arrayRemove, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { timeFormatter } from '../utils/timeFormatter'; // Ensure this path is correct

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const handleDelete = async () => {
    try {
      const chatDocRef = doc(db, "chats", data.chatId);
      const chatDoc = await getDoc(chatDocRef);

      if (chatDoc.exists()) {
        const messagesArray = [...chatDoc.data().messages];

        const messageToRemove = messagesArray.find(msg => msg.id === message.id);

        if (messageToRemove) {
          await updateDoc(chatDocRef, {
            messages: arrayRemove(messageToRemove),
          });
          setShowDeletePopup(false); // Hide popup after deletion
        }
      }
    } catch (err) {
      console.error("Error deleting the message", err);
    }
  };

  const handleMessageClick = () => {
    setShowDeletePopup(!showDeletePopup); // Toggle popup visibility
  };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
      onClick={handleMessageClick} // Toggle delete popup
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL
          }
          alt=""
        />
        <span>{timeFormatter(message.date)}</span> {/* Use the timeFormatter here */}
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
      {showDeletePopup && (
        <div className="deletePopup">
          <p>Delete this message?</p>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Message;

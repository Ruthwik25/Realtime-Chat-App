import React, { useContext, useState } from 'react';

import Img from '../img/imgattach.png';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import Picker from '@emoji-mart/react'; // Modern emoji-mart import
import data from '@emoji-mart/data'; // Importing emoji data

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data: chatData } = useContext(ChatContext); // Renamed to avoid conflicts

  const handleSend = async () => {
    if (!chatData.chatId) {
      console.error('Chat ID is null or undefined');
      return;
    }

    try {
      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          (error) => console.error('Upload error:', error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateDoc(doc(db, 'chats', chatData.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          }
        );
      } else {
        await updateDoc(doc(db, 'chats', chatData.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      await updateDoc(doc(db, 'userChats', currentUser.uid), {
        [`${chatData.chatId}.lastMessage`]: { text },
        [`${chatData.chatId}.date`]: serverTimestamp(),
      });

      setText('');
      setImg(null);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const addEmoji = (emoji) => {
    setText((prev) => prev + emoji.native);
    
  };

  if (!chatData.chatId) {
    return null;
  }

  return (
    <div className="input">
      <div className="emoji-container">
        <input
          type="text"
          placeholder="Type something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="emoji-btn"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          😀
        </button>
        {showEmojiPicker && (
          <div className="emoji-picker">
          <Picker
            data={data}
            onEmojiSelect={addEmoji}
            theme="dark" // Options: 'light', 'dark', 'auto'
            style={{ position: 'absolute', bottom: '50px', right: '20px' }}
          />
          </div>
        )}
      </div>

      <div className="send">
      
        <input
          type="file"
          style={{ display: 'none' }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="Attach Image" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;

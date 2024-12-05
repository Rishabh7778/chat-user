import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUserRoute, host } from '../utils/ApiRoute';
import { Contacts } from '../components/Contacts';
import { Welcome } from '../components/Welcome';
import { ChatContainer } from '../components/ChatContainer';
import { io } from 'socket.io-client';

export const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
  if (!localStorage.getItem("chatappuser")) {
    navigate('/login');
  } else {
    setCurrentUser(JSON.parse(localStorage.getItem("chatappuser")));
    setIsLoaded(true);
  }
}, [navigate]); // Include navigate as a dependency


  useEffect(()=> {
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${allUserRoute}/${currentUser._id}`);
            console.log("Contacts fetched:", response.data);
            setContacts(response.data);
          } catch (error) {
            console.error("Error fetching contacts:", error);
          }
        };
        fetchData();
      } else {
        navigate('/setAvatar');
      }
    }
  }, [currentUser, navigate]); // Include navigate and currentUser as dependencies
  


  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  return (
    <div className='h-screen w-screen bg-slate-800 flex items-center justify-center'>
      <div className='h-[85vh] w-[85vw] bg-slate-900 flex border border-orange-200 border-dotted border-2'>
        <div className='w-[25%] bg-gray-700 flex flex-col'>
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        </div>
        <div className='w-[75%] bg-slate-900'>
          {
            isLoaded && currentChat === undefined ?
              <Welcome currentUser={currentUser} /> :
              <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
          }
        </div>
      </div>
    </div>
  );
};

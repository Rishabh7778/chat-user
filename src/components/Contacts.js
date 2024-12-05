import React, { useEffect, useState } from 'react';
import Logo from "../assets/logo5.png";
import { Logout } from './Logout';

export const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    console.log(contacts);
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser, contacts]); // Include contacts in the dependency array
  

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact)
    // Additional logic for chat selection can go here
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="grid grid-rows-[10%_75%_15%] h-full">
          {/* Top Row: Logo */}
          <div className="bg-sky-950 flex items-center justify-center">
            <img src={Logo} alt="Logo" className="h-12 w-12 rounded-full" />
            <p className="text-white font-bold mx-2 my-1 text-2xl">MAZE</p>
          </div>
          
          {/* Middle Row: Contacts List */}
          <div className="bg-sky-950 overflow-y-scroll scrollbar-thin scrollbar-thumb-rose-500 scrollbar-track-transparent">
            {contacts.map((contact, index) => (
              <div
                key={index}
                className={`p-4 flex items-center font-bold rounded-md cursor-pointer m-2 bg-gray-600 ${
                  index === currentSelected ? "bg-blue-400" : "hover:bg-gray-700"
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <img
                  src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                  alt="avatar"
                  className="h-10 w-10 rounded-full"
                />
                <p className="text-white ml-4">{contact.username}</p>
              </div>
            ))}
          </div>
          
          {/* Bottom Row: Current User Info */}
          <div className="bg-indigo-950 flex items-center justify-center">
            <div className="flex items-center">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
                className="h-12 w-12 rounded-full"
              />
              <p className="text-white font-bold text-xl ml-4">{currentUserName}</p>
              <Logout/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

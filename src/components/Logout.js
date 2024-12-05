import React from 'react'
import { useNavigate } from 'react-router-dom';
import { SlLogout } from "react-icons/sl";

export const Logout = () => {
    const navigate = useNavigate();

    const handleClick = async() => {
        localStorage.clear();
        navigate("/login");
    };

  return (
    <button onClick={handleClick} className='text-white font-bold m-2 text-xl'>
        <SlLogout />
    </button>
  )
}

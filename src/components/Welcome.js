import React from 'react';
import welcome from '../assets/Welcome.gif';

export const Welcome = ({ currentUser }) => {
    return (
        <div className='flex flex-col items-center justify-center mt-24'>
            <img className='h-40 w-40' src={welcome} alt="welcome" />
            <h1 className='text-3xl text-white'>
                Welcome,{' '}
                <span className='text-2xl text-blue-600'>
                    {currentUser?.username || 'Guest'}
                </span>
            </h1>
            <p className='text-white font-bold text-sm'>Please select a chat to Start Messaging</p>
        </div>
    );
};

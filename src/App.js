import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Chat } from './pages/Chat';
import { SetAvatar } from './pages/SetAvatar';

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path='/' element={<Chat />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/setAvatar' element={<SetAvatar />} />
        <Route path='*' element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

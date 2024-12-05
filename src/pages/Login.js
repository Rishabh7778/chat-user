import React, { useEffect, useState } from 'react';
import logo6 from '../assets/logo6.png';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { loginRoute } from '../utils/ApiRoute';

export const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOption = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
  };

  useEffect(() => {
    if (localStorage.getItem("chatappuser")) {
      navigate('/');
    }
  }, [navigate]); // Include navigate as a dependency
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log("in validation", loginRoute)
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOption);
      }
      if (data.status === true) {
        localStorage.setItem("chatappuser", JSON.stringify(data.user));
        navigate('/');
      }
    }
  };

  const handleValidation = () => {
    const { password, username, } = values;

    if (password === "") {
      toast.error("Please enter the password", toastOption);
      return false;
    }
    if (!username || !password) {
      toast.error("All fields are required", toastOption);
      return false;
    }
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long", toastOption);
      return false;
    }
    return true; // Return true if all validations pass
  };


  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-50">
      <div className="bg-blue-300 p-8 rounded-lg shadow-lg w-full max-w-md">
        <img className='h-10 w-10 mx-auto' src={logo6} alt="Logo" />
        <h1 className='text-3xl text-center font-bold text-white'>Login Page</h1>
        <p className='text-white text-center'>Please a login page</p>
        <form className='mt-4' onSubmit={(event) => handleSubmit(event)}>
          <div className="mb-5">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
          >
            Login
          </button>
          <p className='m-2'>You don't have a account please <span className='text-indigo-500'><Link to="/register">Sign-up</Link></span></p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

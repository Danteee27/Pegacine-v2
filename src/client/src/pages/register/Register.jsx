import { useRef } from 'react';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './register.scss';
import { Link, Route, Routes } from 'react-router-dom';
import axios, { axiosInstance3 } from '../../axios';
import Login from '../login/Login';
import Home from '../home/Home';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  async function fetchData() {
    const request = await axiosInstance3.post(
      `http://localhost:3000/api/user/register`,
      {
        email: email,
        password: passwordRef.current.value,
      },
    );
    if (request.data.statusCode === 200) {
      window.location.href = '/login';
    }
    console.log(request.data.statusCode);
  }
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src="../logo.png" alt="" />
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <p>
          Already have an account? <a href="/login">Login now</a>
        </p>
        {!email ? (
          <div className="input">
            <input
              type="text"
              placeholder="Enter your username"
              ref={emailRef}
            />
            <button className="registerButton" onClick={handleStart}>
              Get Started <ArrowForwardIosIcon />
            </button>
          </div>
        ) : (
          <div className="input-pass">
            <div className="input">
              <input
                type="password"
                placeholder="Enter your password"
                ref={passwordRef}
              />

              <button className="registerButton" onClick={fetchData}>
                Start
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

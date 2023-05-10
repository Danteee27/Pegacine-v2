import { Link, Route, Routes } from 'react-router-dom';
import React, { useRef } from 'react';
import Home from '../home/Home';
import Register from '../register/Register';
import axios, { axiosInstance3 } from '../../axios';
import './login.scss';

export default function Login() {
  const username = useRef();
  const password = useRef();

  async function fetchData() {
    const request = await axiosInstance3.post(
      `http://localhost:3000/api/user/login`,
      {
        email: username.current.value,
        password: password.current.value,
      },
    );
    if (request.data.statusCode === 200) {
      window.location.href = '/home';
    }
    console.log(request.data.statusCode);
  }

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src="../logo.png" alt="" />
        </div>
      </div>
      <div className="container">
        <div className="form-control">
          <h1>Sign In</h1>
          <input
            ref={username}
            type="text"
            placeholder="Enter your email address"
          />
          <input
            ref={password}
            type="password"
            placeholder="Enter your password"
          />
          <button onClick={fetchData} className="loginButton">
            Sign In
          </button>

          <span>
            New to Netflix? <a href="/register">Sign up now</a>
          </span>
        </div>
      </div>
    </div>
  );
}

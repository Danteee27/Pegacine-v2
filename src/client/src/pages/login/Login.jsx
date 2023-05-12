import { Link, Route, Routes } from 'react-router-dom';
import React, { useRef } from 'react';
import Home from '../home/Home';
import Register from '../register/Register';
import axios, { axiosInstance3 } from '../../axios';
import './login.scss';
import { useSignIn } from 'react-auth-kit';
import { Alert, AlertTitle } from '@mui/material';

export default function Login() {
  const username = useRef();
  const password = useRef();
  const signIn = useSignIn();
  async function fetchData() {
    let data = JSON.stringify({
      email: username.current.value,
      password: password.current.value,
    });
    const request = await axiosInstance3
      .post(`http://localhost:3000/api/user/login`, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        if (response.data.statusCode === 200) {
          signIn({
            token: response.data.data.jwt.token,
            expiresIn: 360,
            tokenType: 'Bearer',
            authState: { username: username.current.value },
          });
          const user = response.data.data.user;
          localStorage.setItem('user', JSON.stringify(user));
          window.location.href = '/home';
        }
      })
      .catch(function (error) {
        console.log(error);
        alert('login failed');
      });
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
            New to Pegacine? <a href="/register">Sign up now</a>
          </span>
        </div>
      </div>
    </div>
  );
}

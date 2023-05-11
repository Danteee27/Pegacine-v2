import { useHistory } from 'react-router-dom';
import React, { useRef } from 'react';
import './login.css';

export default function Login() {
  const username = useRef();
  const password = useRef();
  // const signIn = useSignIn();
  // async function fetchData() {
  //   let data = JSON.stringify({
  //     email: username.current.value,
  //     password: password.current.value,
  //   });
  //   const request = await axiosInstance3
  //     .post(`http://localhost:3000/api/user/login`, data, {
  //       headers: { 'Content-Type': 'application/json' },
  //     })
  //     .then(function (response) {
  //       if (response.data.statusCode === 200) {
  //         signIn({
  //           token: response.data.data.jwt.token,
  //           expiresIn: 360,
  //           tokenType: 'Bearer',
  //           authState: { username: username.current.value },
  //         });
  //         const user = response.data.data.user;
  //         localStorage.setItem('user', JSON.stringify(user));
  //         window.location.href = '/home';
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       alert('login failed');
  //     });
  // }

  const history = useHistory();

  const handleSubmit = () => {
    if (username.current.value === 'admin' && password.current.value === 'admin') {
      history.push('/home');
    }
  }

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src="../logo.png" alt="" />
        </div>
      </div>
      <div className="container1">
        <div className="form-control">
          <h1>Admin Panel</h1>
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
          <button onClick={handleSubmit} className="loginButton">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
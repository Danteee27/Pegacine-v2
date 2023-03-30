import { Link, Route, Routes } from 'react-router-dom';
import Home from '../home/Home';
import Register from '../register/Register';
import './login.scss';

export default function Login() {
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src="../logo.png" alt="" />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input type="email" placeholder="Enter your email address" />
          <input type="password" placeholder="Enter your password" />
          <Link to="/home">
            <button className="loginButton">Sign In</button>
          </Link>

          <Routes>
            <Route path="/home" element={<Home />} />
          </Routes>
          <span>
            New to Netflix? <a href="/register">Sign up now</a>
          </span>
        </form>
      </div>
    </div>
  );
}

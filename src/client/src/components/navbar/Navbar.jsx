import Search from '@mui/icons-material/Search';
import Notifications from '@mui/icons-material/Notifications';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import React, { useState } from 'react';
import './navbar.scss';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import PlayerPage from '../../pages/player/PlayerPage';
import SearchPage from '../../pages/search/SearchPage';
import Home from '../../pages/home/Home';
import Series from '../../pages/series/Series';
import requests from '../../Requests';
import { useSignOut } from 'react-auth-kit';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const signOut = useSignOut();
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const logout = () => {
    signOut();
    localStorage.clear();
    navigate('/login');
  };
  const backHome = () => {
    window.location.href = '/home';
  };
  const upgradeAccount = () => {
    window.location.href = 'plan-form';
  };
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
      <div className="container">
        <div className="left">
          <img src="../logo.png" className="logo" alt="" onClick={backHome} />
          <a href="./home">
            <span>Home</span>
          </a>
          {/*<Link to="../series">*/}
          {/*  <span>Series</span>*/}
          {/*</Link>*/}
          {/*<Link to="../player"><span>Movies</span></Link>*/}
          {/*<Link to="../player"><span>New and Popular</span></Link>*/}
          <a href="./myList">
            <span>My List</span>
          </a>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/player" element={<PlayerPage />} />
            {/*<Route*/}
            {/*  path="/series"*/}
            {/*  element={<Series fetchUrl={requests.fetchTrending} />}*/}
            {/*/>*/}
          </Routes>
        </div>
        <div className="right">
          <a href="./search">
            <Search className="icon" />
          </a>
          <span className="username">{userDetails.username}</span>

          <div className="profile">
            <img
              src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
              alt=""
            />

            <div className="options">
              <span>Membership: {userDetails.userRank}</span>
              <span>Phone: {userDetails.phoneNumber}</span>
            </div>
          </div>
          <div className="profile">
            <ArrowDropDown className="icon" />

            <div className="options">
              <span onClick={upgradeAccount}>Up Memberships</span>

              <span onClick={logout}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;

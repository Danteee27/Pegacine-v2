import Search from '@mui/icons-material/Search';
import Notifications from '@mui/icons-material/Notifications';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import React, { useState } from 'react';
import './navbar.scss';
import {Link, Route, Routes} from "react-router-dom";
import PlayerPage from "../../pages/player/PlayerPage";
import SearchPage from "../../pages/search/SearchPage";
import Home from "../../pages/home/Home";
import Series from "../../pages/series/Series";
import requests from "../../Requests";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
      <div className="container">
        <div className="left">
          <img src="../logo.png" alt="" />
          <a href="./home"><span>Homepage</span></a>
          <Link to="../series"><span>Series</span></Link>
          {/*<Link to="../player"><span>Movies</span></Link>*/}
          {/*<Link to="../player"><span>New and Popular</span></Link>*/}
          <a href="./myList"><span>My List</span></a>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/player" element={<PlayerPage />} />
            <Route path="/series"  element={<Series fetchUrl={requests.fetchTrending}/>} />
          </Routes>
        </div>
        <div className="right">
          <a href="./search"><Search className="icon"/></a>
          <span className="username">Phu Nguyen</span>
          <Link to="/register">
          <img
            src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
            alt=""
          />
          </Link>
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

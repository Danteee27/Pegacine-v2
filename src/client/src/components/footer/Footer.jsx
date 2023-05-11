import Search from '@mui/icons-material/Search';
import Notifications from '@mui/icons-material/Notifications';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import React, { useState } from 'react';
import './footer.scss';
import { Link, Route, Routes } from 'react-router-dom';
import PlayerPage from '../../pages/player/PlayerPage';
import SearchPage from '../../pages/search/SearchPage';
import Home from '../../pages/home/Home';
import Series from '../../pages/series/Series';
import requests from '../../Requests';

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <img src="../logo.png" alt="" />
        <div className="menu">
          <a href="./home">
            <span>Homepage</span>
          </a>
          {/*<Link to="../series">*/}
          {/*  <span>Series</span>*/}
          {/*</Link>*/}

          {/*<Link to="../player"><span>Movies</span></Link>*/}
          {/*<Link to="../player"><span>New and Popular</span></Link>*/}
          <a href="./myList">
            <span>My List</span>
          </a>
          <Link to="../series">
            <span>About Us</span>
          </Link>
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
      </div>
    </div>
  );
};

export default Footer;

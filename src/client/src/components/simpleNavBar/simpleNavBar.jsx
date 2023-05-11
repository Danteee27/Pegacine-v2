import Search from '@mui/icons-material/Search';
import Notifications from '@mui/icons-material/Notifications';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import React, { useState } from 'react';
import './simpleNavBar.scss';
import {Link, Route, Routes} from "react-router-dom";
import PlayerPage from "../../pages/player/PlayerPage";
import SearchPage from "../../pages/search/SearchPage";
import Home from "../../pages/home/Home";
import Series from "../../pages/series/Series";
import requests from "../../Requests";

const SimpleNavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };
    return (
        <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
            <div className="container">
                <div className="left">
                    <Link to={"./home"}> <img src="../logo.png" alt=""/> </Link>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/player" element={<PlayerPage />} />
                        <Route path="/series"  element={<Series fetchUrl={requests.fetchTrending}/>} />
                    </Routes>
                </div>
                <div className="right">
                    <span className="signOut">Sign Out</span>
                </div>
            </div>
        </div>
    );
};

export default SimpleNavBar;

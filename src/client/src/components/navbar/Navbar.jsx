// import React from 'react'
// import "./navbar.scss"
// import Search from "@mui/icons-material/Search"
// import Notifications from "@mui/icons-material/Notifications"
//
// function Navbar() {
//   return (
//     <div>
//       <div className="navbar">
//         <div className="container">
//             <div className="left">
//                 <img src="../logo.png" alt="" />
//                 <span>Homepage</span>
//                 <span>Series</span>
//                 <span>Movies</span>
//                 <span>New and popular</span>
//                 <span>My list</span>
//                 </div>
//                 <div className='right'>
//                     <Search/>
//                     Phu Nguyen
//                     <Notifications/>
//                 </div>
//         </div>
//       </div>
//     </div>
// )
// }
//
// export default Navbar

import Search from '@mui/icons-material/Search';
import Notifications from '@mui/icons-material/Notifications';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import './navbar.scss';

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
                    <span>Homepage</span>
                    <span>Series</span>
                    <span>Movies</span>
                    <span>New and Popular</span>
                    <span>My List</span>
                </div>
                <div className="right">
                    <Search className="icon" />
                    <span className="username">Phu Nguyen</span>
                    <img
                        src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                    />
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
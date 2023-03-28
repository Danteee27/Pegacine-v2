import React from 'react'
import "./navbar.scss"
import Search from "@mui/icons-material/Search"
import Notifications from "@mui/icons-material/Notifications"

function Navbar() {
  return (
    <div>
      <div className="navbar">
        <div className="container">
            <div className="left">
                <img src="../logo.png" alt="" />
                <span>Homepage</span>
                <span>Series</span>
                <span>Movies</span>
                <span>New and popular</span>
                <span>My list</span>
                </div>
                <div className='right'>
                    <Search/>
                    Phu Nguyen
                    <Notifications/>
                </div>
        </div>
      </div>
    </div>
)
}

export default Navbar

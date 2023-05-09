import "./sidebar.css";
import {
  LineStyle,
  Airplay,
  PermIdentity,
  PlayCircleOutline,
  AttachMoney,
  Movie,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const location = useLocation();

  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className={splitLocation[1] === "" ? "sidebarListItem active" : "sidebarListItem"}>
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            {/* <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className={splitLocation[1] === "users" ? "sidebarListItem active" : "sidebarListItem"}>
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/series" className="link">
              <li className={splitLocation[1] === "series" || splitLocation[1] === "newSeries" || splitLocation[1] === "series-detail"? "sidebarListItem active" : "sidebarListItem"}>
              <Airplay className="sidebarIcon" />
                Series
              </li>
            </Link>
            <Link to="/movies" className="link">
              <li className={splitLocation[1] === "movies" || splitLocation[1] === "movie" || splitLocation[1] === "newMovie" ? "sidebarListItem active" : "sidebarListItem"}>
              <PlayCircleOutline className="sidebarIcon" />
                Movies
              </li>
            </Link>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            <Link to="/genres" className="link">
              <li className={splitLocation[1] === "genres" || splitLocation[1] === "genre" || splitLocation[1] === "newGenre" ? "sidebarListItem active" : "sidebarListItem"}>
                <Movie className="sidebarIcon" />
                Genres
              </li>
            </Link>
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}

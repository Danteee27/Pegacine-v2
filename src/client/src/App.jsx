import * as React from 'react';
import Navbar from './components/navbar/Navbar';
import requests from "./Requests";
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import SearchPage from "./pages/search/SearchPage";
import PlayerPage from "./pages/player/PlayerPage";
import MyList from "./pages/myList/MyList";

export default function App() {
  return (
    <div>
      {/*<PlayerPage />*/}
      {/*  <Home/>*/}
        <MyList fetchUrl={requests.fetchActionMovies}/>
    </div>
  );

}

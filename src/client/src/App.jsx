import * as React from 'react';
import Navbar from './components/navbar/Navbar';
import requests from "./Requests";
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import SearchPage from './pages/search/SearchPage';
import PlayerPage from './pages/player/PlayerPage';
import MyList from "./pages/myList/MyList";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Routes,
} from 'react-router-dom';
import {useContext} from 'react';


export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/player" element={<PlayerPage/>}/>
                <Route path="/myList" element={<MyList fetchUrl={requests.fetchTrending}/>}/>
                <Route path="/search" element={<SearchPage/>}/>
            </Routes>
        </div>
    );
}

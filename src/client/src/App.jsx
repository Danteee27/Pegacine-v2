import * as React from 'react';
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
import TestPage from "./pages/test/Test";
import Series from "./pages/series/Series";


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
                <Route path="/test" element={<TestPage/>}/>
                <Route path="/series" element={<Series fetchUrl={requests.fetchTrending}/>}/>

            </Routes>
        </div>
    );
}

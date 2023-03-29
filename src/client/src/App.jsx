import * as React from 'react';
import Navbar from './components/navbar/Navbar';

import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import SearchPage from "./pages/search/SearchPage";
import PlayerPage from "./pages/player/PlayerPage";
export default function App() {
  return (
    <div>
      <PlayerPage />
    </div>
  );

}

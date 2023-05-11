import * as React from 'react';
import requests from './Requests';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import SearchPage from './pages/search/SearchPage';
import PlayerPage from './pages/player/PlayerPage';
import MyList from './pages/myList/MyList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Routes,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { useContext } from 'react';
import TestPage from './pages/test/Test';
import Series from './pages/series/Series';
import Test from './pages/test/Test';
import { useEffect } from 'react';
import { useState } from 'react';
import { RequireAuth } from 'react-auth-kit';

export default function App() {
  // const location = useLocation();
  // const queryParameters = new URLSearchParams(location.search);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <Routes>
        <Route
          path="/home"
          element={
            <RequireAuth loginPath="/login">
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/player/*"
          element={
            <RequireAuth loginPath="/login">
              <PlayerPage />
            </RequireAuth>
          }
        />

        <Route
          path="/test"
          element={<TestPage testValue={searchParams.get('url')} />}
        />
        <Route
          path="/myList"
          element={
            <RequireAuth loginPath="/login">
              <MyList fetchUrl={requests.fetchTrending} />
            </RequireAuth>
          }
        />
        <Route
          path="/search"
          element={
            <RequireAuth loginPath="/login">
              <SearchPage />
            </RequireAuth>
          }
        />
        <Route
          path="/series"
          element={
            <RequireAuth loginPath="/login">
              <Series fetchUrl={requests.fetchTrending} />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

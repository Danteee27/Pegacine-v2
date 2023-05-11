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
    Routes, useLocation, useSearchParams,
} from 'react-router-dom';
import {useContext} from 'react';
import TestPage from "./pages/test/Test";
import Series from "./pages/series/Series";
import Test from "./pages/test/Test";
import PlanForm from "./pages/planForm/PlanForm";
import PaymentPicker from "./pages/paymentPicker/paymentPicker";


export default function App() {
    // const location = useLocation();
    // const queryParameters = new URLSearchParams(location.search);
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <div>
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/player/*" element={<PlayerPage/>} />

                <Route path='/test'
                       element={<TestPage
                           testValue={searchParams.get("url")}/>}/>
                <Route path="/myList" element={<MyList fetchUrl={requests.fetchTrending}/>}/>
                <Route path="/search" element={<SearchPage/>}/>
                {/*<Route path="/test" element={<TestPage/>}/>*/}
                <Route path="/series" element={<Series fetchUrl={requests.fetchTrending}/>}/>
                <Route path="/planForm" element={<PlanForm/>}/>
                <Route path="/paymentPicker" element={<PaymentPicker/>}/>

            </Routes>
        </div>
    );
}

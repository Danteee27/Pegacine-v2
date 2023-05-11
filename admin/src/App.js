import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext } from "react";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";
import MovieList from "./pages/movieList/MovieList";
import NewMovie from "./pages/newMovie/NewMovie";
import Movie from "./pages/movie/Movie";
import SeriesList from "./pages/seriesList/SeriesList";
import Series from "./pages/series/Series";
import NewSeries from "./pages/newSeries/NewSeries";
import GenreList from "./pages/genreList/GenreList";
import Genre from "./pages/genre/Genre";
import NewGenre from "./pages/newGenre/NewGenre";
import TransactionList from "./pages/transactionList/TransactionList";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        {/* <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route> */}
        {/* {user && ( */}
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/movies">
                <MovieList />
              </Route>
              <Route path="/movie/:movieId">
                <Movie />
              </Route>
              <Route path="/newMovie">
                <NewMovie />
              </Route>
              <Route path="/series">
                <SeriesList />
              </Route>
              <Route path="/series-detail/:seriesId">
                <Series />
              </Route>
              <Route path="/newSeries">
                <NewSeries />
              </Route>
              <Route path="/genres">
                <GenreList />
              </Route>
              <Route path="/genre/:genreId">
                <Genre />
              </Route>
              <Route path="/newGenre">
                <NewGenre />
              </Route>
              <Route path="/lists">
                <ListList />
              </Route>
              <Route path="/list/:listId">
                <List />
              </Route>
              <Route path="/newlist">
                <NewList />
              </Route>
              <Route path="/transactions">
                <TransactionList />
              </Route>
            </div>
          </>
        {/* )} */}
      </Switch>
    </Router>
  );
}

export default App;

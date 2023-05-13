import Navbar from '../../components/navbar/Navbar';
import HighLight from '../../components/highlight/HighLight';
import List from '../../components/list/List';
import './home.scss';
import axios, { axiosInstance3 } from '../../axios';
import { useState } from 'react';
import { useEffect } from 'react';

import TopList from '../../components/topList/TopList';
import Footer from '../../components/footer/Footer';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [movies1, setMovies1] = useState([]);
  const [movies2, setMovies2] = useState([]);
  const [movies3, setMovies3] = useState([]);
  const [movies4, setMovies4] = useState([]);
  const [movies5, setMovies5] = useState([]);
  const [movies6, setMovies6] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem('user'));
  console.log('userDetails: ', userDetails);
  useEffect(() => {
    if (userDetails.userRank === 'NONE') {
      window.location.href = '/plan-form';
    }
    async function fetchData() {
      const request = await axiosInstance3.get(
        `http://localhost:3000/api/movie/find_by_movie_genres?genre_id=12&page=1&pageSize=10`,
      );
      setMovies(request.data.data.items);
      console.log('movieDataList at Home: ', request.data.data.items);
    }

    async function fetchData1() {
      const request = await axiosInstance3.get(
        `http://localhost:3000/api/movie/find_by_movie_genres?genre_id=14&page=1&pageSize=10`,
      );
      setMovies1(request.data.data.items);
      console.log('movieDataList at Home: ', request.data.data.items);
    }

    async function fetchData2() {
      const request = await axiosInstance3.get(
        `http://localhost:3000/api/movie/find_by_movie_genres?genre_id=16&page=1&pageSize=10`,
      );
      setMovies2(request.data.data.items);
      console.log('movieDataList at Home: ', request.data.data.items);
    }

    async function fetchData3() {
      const request = await axiosInstance3.get(
        `http://localhost:3000/api/movie/find_by_movie_genres?genre_id=18&page=1&pageSize=10`,
      );
      setMovies3(request.data.data.items);
      console.log('movieDataList at Home: ', request.data.data.items);
    }

    async function fetchData4() {
      const request = await axiosInstance3.get(
        `http://localhost:3000/api/movie/find_by_movie_genres?genre_id=27&page=1&pageSize=10`,
      );
      setMovies4(request.data.data.items);
      console.log('movieDataList at Home: ', request.data.data.items);
    }

    async function fetchData5() {
      const request = await axiosInstance3.get(
        `http://localhost:3000/api/movie/find_by_movie_genres?genre_id=28&page=1&pageSize=10`,
      );
      setMovies5(request.data.data.items);
      console.log('movieDataList at Home: ', request.data.data.items);
    }

    fetchData();
    fetchData1();
    fetchData2();
    fetchData3();
    fetchData4();
    fetchData5();
  }, []);
  return (
    <div className="home">
      <Navbar />
      <HighLight />
      <TopList movieDataList={movies} title={'Hot movies today'} />
      <List movieDataList={movies1} title={'Only in Pegacine'} genreId={"14"} />
      <List movieDataList={movies2} title={'Drama'} genreId={"16"} />
      <List movieDataList={movies3} title={'Action' } genreId={"18"} />
      <TopList movieDataList={movies5} title={'Highly Recommend Movies'} />
      <List movieDataList={movies4} title={'Anime'} genreId={"27"} />
      <List movieDataList={movies5} title={'Romantic'} genreId={"28"}/>
      <List movieDataList={movies5} title={'Exciting TV Shows'} genreId={"28"}/>

      <Footer />
    </div>
  );
};

export default Home;

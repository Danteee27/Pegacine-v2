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
  const [moviesTop10Country, setMoviesTop10Country] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axiosInstance3.get(
        `http://localhost:3000/api/movie/find_by_movie_genres?genre_id=12&page=1&pageSize=10`,
      );
      setMovies(request.data.data.items);
      console.log('movieDataList: ', request.data.data.items);
    }
    async function fetchDataTop10VN() {
      const request = await axiosInstance3.get(
        `http://localhost:3000/api/movie/find_by_country?country_id=1&page=1&pageSize=10`,
      );
      setMoviesTop10Country(request.data.data.items);
      console.log('movieDataList: ', request.data.data.items);
    }
    fetchDataTop10VN();
    fetchData();
  }, []);
  return (
    <div className="home">
      <Navbar />
      <HighLight />
      <TopList movieDataList={movies} title={'Hot movies today'} />
      <List movieDataList={movies} title={'Only in Pegacine'} />
      <List movieDataList={movies} title={'Drama'} />
      <List movieDataList={movies} title={'K Drama'} />
      <List movieDataList={movies} title={'V Drama'} />
      <List movieDataList={movies} title={'T Drama'} />
      {/* {moviesTop10Country && (
        <TopList
          movieDataList={moviesTop10Country}
          title={'Hot movies in Vietnam today'}
        />
      )} */}
      <Footer />
    </div>
  );
};

export default Home;

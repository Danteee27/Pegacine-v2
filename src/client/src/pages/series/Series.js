import Navbar from '../../components/navbar/Navbar';
import HighLight from '../../components/highlight/HighLight';
import List from '../../components/list/List';
import './series.css';
import TopList from "../../components/topList/TopList";
import Card from "../../components/card/Card";
import React, {useEffect, useState} from "react";
import {axiosInstance3} from "../../axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Series = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [movies, setMovies] = useState([]);

    useEffect(() => {

        async function fetchData() {
            const request = await axiosInstance3.get('http://localhost:3000/api/movie/series');
            // const request = await axiosInstance3.get('http://localhost:3000/api/user/profiles/my_list?profile_id=2&page=1&pageSize=999');
            console.log("request: ", request)
            setMovies(request.data);
            return request;
        }
        fetchData();
    }, []);


    return (
        <div className="home">
            <Navbar />
            <div className={"genres"}></div>
            <HighLight />
            <div className="seriesContainer">
                <h1>Series</h1>
                <div className="seriesContent">
                    {movies.map((movie, index) => {
                        return (<Card
                            movieData={movie}
                            index={index}
                            key={movie.movie_id}
                            isLiked={true}
                            isSeries={true}
                        />);
                    })}
                </div>
            </div>
        </div>
    );
};

export default Series;

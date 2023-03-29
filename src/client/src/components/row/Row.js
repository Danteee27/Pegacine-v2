import React, {useEffect, useState} from 'react'
import "./Row.css"
import axios from "../../axios";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import requests from "../../Requests";


function Row({title, fetchUrl, isLargeRow = false}) {
    const [movies, setMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original/";
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();
    }, [fetchUrl]);

    console.log(movies)

    return (
        <div className={"row"}>
            <h2>{title}</h2>

            <div className={"row__posters"}>
                {
                    (movies.length === 0 && <div style={{fontWeight:"bold" , fontSize:'20px'}}>{/*write something here*/}</div>) ||
                    (
                        movies.map(movie =>
                            (((isLargeRow && movie.poster_path) ||
                                    (!isLargeRow && movie.backdrop_path)) && (
                                    <img
                                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                        key={movie.id}
                                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                        alt={`${movie.name}`}
                                    />
                                )

                            )
                        )
                    )
                }
            </div>

        </div>

        // <Slider {...settings}>
        //     <div className={"row__posters"}>
        //         {movies.map(movie =>
        //             ( ((isLargeRow && movie.poster_path) ||
        //                     (!isLargeRow && movie.backdrop_path)) && (
        //                     <img
        //                         className={`row__poster ${isLargeRow && "row__posterLarge"}`}
        //                         key={movie.id}
        //                         src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
        //                         alt={`${movie.name}`}
        //                     />
        //                 )
        //
        //             ))}
        //     </div>
        //
        // </Slider>
    )
}

export default Row
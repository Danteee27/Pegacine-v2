import React, {useEffect, useState} from 'react'
import "./Row.css"
import "./RowItem.scss"
import axios from "../../axios";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import requests from "../../Requests";
import {Add, PlayArrow, ThumbDownOutlined, ThumbUpAltOutlined} from "@mui/icons-material";
import ItemList from "../itemList/ItemList";

function Row({title, fetchUrl, isLargeRow = false}) {
    const [movies, setMovies] = useState([]);

    const trailer = 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761';
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

    return (<div className={"row"}>
            <h2>{title}</h2>

            <div className={"row__posters"}>
                {(movies && movies.length === 0 &&
                        <div style={{
                            fontWeight: "bold",
                            fontSize: '20px'
                        }}>                            {/*write something here*/}</div>
                    )
                    || (movies && movies.map((movie, index) =>
                        (((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                                <div
                                    className={" "}
                                >
                                    <img
                                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                        key={movie.id}
                                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                        alt={`${movie.name}`}
                                    />
                                </div>
                            )

                        )))
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
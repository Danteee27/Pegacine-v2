// import React from 'react'
// import requests from "../../Requests";
// import Row from "../../components/row/Row";
//
//
//
// function MyList() {
//
//
//     return (
//         <div className={"myList"}>
//             {
//                 <Row title={"My List"} fetchUrl={requests.fetchActionMovies} isLargeRow={false}/>
//             }
//         </div>
//     )
//
// }
//
//
// export default MyList


import React, {useEffect, useState} from "react";
import Card from "../../components/card/Card";
import styled from "styled-components";
import axios from "../../axios";
import requests from "../../Requests";
import Navbar from "../../components/navbar/Navbar";
import "./MyList.css"

export default function MyList({fetchUrl}) {
    const trailer = 'https://media.istockphoto.com/id/857947444/vi/video/thu-nh%E1%BB%8F-%C4%91%E1%BA%A7u-b%E1%BA%BFp-trang-tr%C3%AD-%C4%91%C4%A9a-c%E1%BB%A7a-m%C3%ACnh-v%C3%A0-tr%C3%B4ng-r%E1%BA%A5t-h%E1%BA%A1nh-ph%C3%BAc.mp4?s=mp4-640x640-is&k=20&c=aiuYYFGW7o-MIb95Gr1MLRP8F0gc7WD3u5qEpe1sR4I=';
    const base_url = "https://image.tmdb.org/t/p/original/";
    const [isScrolled, setIsScrolled] = useState(false);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            console.log(request)
            return request;
        }

        fetchData();
    }, []);


    console.log(movies)

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    return (
        <div className={"myList"}><Container>
            <Navbar/>
            <div className="content flex column">
                <h1>My List</h1>
                <div className="grid flex">
                    {movies.map((movie, index) => {
                        return (<Card
                            movieData={movie}
                            index={index}
                            key={movie.id}
                            isLiked={true}
                        />);
                    })}
                </div>
            </div>
        </Container></div>
    );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;

    h1 {
      color: snow;
      margin-left: 3rem;
    }

    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;

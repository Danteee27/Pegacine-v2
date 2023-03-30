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


import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import styled from "styled-components";
import axios from "../../axios";
import requests from "../../Requests";

export default function MyList({fetchUrl}) {
    const trailer = 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761';
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
        <Container>
            <div className="content flex column">
                <h1>My List</h1>
                <div className="grid flex">
                    {movies.map((movie, index) => {
                        return (
                            <Card
                                movieData={movie}
                                index={index}
                                key={movie.id}
                                isLiked={true}
                            />
                        );
                    })}
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;

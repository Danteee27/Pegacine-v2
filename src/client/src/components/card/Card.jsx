import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {IoPlayCircleSharp} from 'react-icons/io5';
import {AiOutlinePlus} from 'react-icons/ai';
import {RiThumbUpFill, RiThumbDownFill} from 'react-icons/ri';
import {BiChevronDown} from 'react-icons/bi';
import {BsCheck} from 'react-icons/bs';

import './Card.css';
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import PlayerPage from "../../pages/player/PlayerPage";

export default React.memo(function Card({index, movieData, isLiked = false,isVip=false}) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const trailer =
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    const base_url = 'https://image.tmdb.org/t/p/original/';

    return (
        <Container
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img className={"imgItem"}
                 src={`${base_url}${movieData.backdrop_path}`}
                 alt="card"
                 onClick={() => navigate("/player/")}
            />
            { isVip &&
                <div className={"vipTag"}>
                {/*<svg xmlns="http://www.w3.org/2000/svg" className="svg-icon"*/}
                {/*     viewBox="0 0 1024 1024" version="1.1">*/}
                {/*    <path*/}
                {/*        d="M896 896H128a128 128 0 0 1-128-128V256a128 128 0 0 1 128-128h768a128 128 0 0 1 128 128v512a128 128 0 0 1-128 128zM128 213.333333a42.666667 42.666667 0 0 0-42.666667 42.666667v512a42.666667 42.666667 0 0 0 42.666667 42.666667h768a42.666667 42.666667 0 0 0 42.666667-42.666667V256a42.666667 42.666667 0 0 0-42.666667-42.666667z m592.213333 465.493334a42.666667 42.666667 0 0 1-42.666666-42.666667V387.84a42.666667 42.666667 0 0 1 42.666666-42.666667H768a123.306667 123.306667 0 0 1 0 246.186667h-6.4v45.226667a42.666667 42.666667 0 0 1-41.386667 42.24z m42.666667-248.32v75.946666H768a37.973333 37.973333 0 0 0 0-75.52z m-213.333333 248.32a42.666667 42.666667 0 0 1-42.666667-42.666667V387.84a42.666667 42.666667 0 0 1 85.333333 0v248.32a42.666667 42.666667 0 0 1-42.24 42.666667z m-240.213334 0a42.666667 42.666667 0 0 1-39.253333-25.6L161.706667 404.906667a42.666667 42.666667 0 0 1 78.506666-34.133334l66.133334 151.04 54.186666-148.48a42.666667 42.666667 0 1 1 80.213334 29.013334L349.866667 650.666667a42.666667 42.666667 0 0 1-38.826667 28.16z"/>*/}
                {/*</svg>*/}
                    <img src={require("../../assets/vip.jpg")} alt="img vip"/>
            </div>
            }

            {isHovered && (
                <div className="hover">
                    <div className="image-video-container">
                        <img
                            src={`${base_url}${movieData.backdrop_path}`}
                            alt="card"
                            onClick={() => navigate("/player")}
                        />
                        <video
                            src={trailer}
                            autoPlay={true}
                            loop
                            muted
                            onClick={() => navigate("/player")}
                        />
                    </div>
                    <div className="info-container flex column">
                        <h3 className="name"
                            // onClick={() => navigate("/player")}
                        >
                            {movieData.name}
                        </h3>
                        <div className="icons flex j-between">
                            <div className="controls flex">
                                <Link to="../player">
                                    <IoPlayCircleSharp
                                        title="Play"/>
                                </Link>


                                {/*<Routes>*/}
                                {/*    <Route path="/player" element={<PlayerPage/>}/>*/}
                                {/*</Routes>*/}

                                <RiThumbUpFill title="Like"/>
                                <RiThumbDownFill title="Dislike"/>
                                {isLiked ? (
                                    <BsCheck
                                        title="Remove from List"
                                        // onClick={() =>
                                        //     dispatch(
                                        //         removeMovieFromLiked({movieId: movieData.id, email})
                                        //     )
                                        // }
                                    />
                                ) : (
                                    <AiOutlinePlus
                                        title="Add to my list"
                                        // onClick={addToList}
                                    />
                                )}
                            </div>
                            <div className="info">
                                <BiChevronDown title="More Info"/>
                            </div>
                        </div>
                        <div className="genres flex">
                            <ul className="flex">
                                {movieData.genre_ids.map((genre) => (
                                    <li key={genre}>{genre}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
});

const Container = styled.div`
  max-width: 290px;
  width: 290px;
  height: 160px;
  cursor: pointer;
  position: relative;


  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  .hover {
    z-index: 99;
    height: max-content;
    width: 430px;
    position: absolute;
    top: -6vh;
    left: -30px;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 1px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    border-radius: 3%;

    .image-video-container {
      position: relative;
      height: 140px;

      img {
        width: 100%;
        height: 236px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }

      video {
        width: 100%;
        height: 236px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }

    .info-container {
      padding: 1rem;
      //gap: 0.5rem;
      gap: 100px;
    }

    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }

      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        color: snow;

        &:hover {
          color: #b8b8b8;
        }
      }
    }

    .genres {
      ul {
        gap: 1rem;

        li {
          padding-right: 0.7rem;

          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
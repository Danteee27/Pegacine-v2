import './itemList.scss';
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
  InfoOutlined,
  InfoRounded,
  CloseOutlined, CheckCircleOutline,
} from '@mui/icons-material';
import { Link, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import requests from '../../Requests';
import PlayerPage from '../../pages/player/PlayerPage';
import { Button, IconButton } from '@mui/material';
import { axiosInstance3 } from '../../axios';

export default function ItemList({ index, movieData }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);
  const [idMovieMyList, setIdMovieMyList] = useState([]);
  const [isInMyList, setIsInMyList] = useState(false);

  const userDetails = JSON.parse(localStorage.getItem('user'));
  console.log('userDetails at item top list: ', userDetails);

  useEffect(() => {
    async function fetchData(id) {
      const request = await axiosInstance3.get(
        `http://localhost:3000/api/movie/findById?id=` + id,
      );
      // setMovie(request.data.data.items);
      console.log('movie: ', request.data.data);
      setMovie(request.data.data);
      return request;
    }
    async function fetchDataCast(id) {
      const request = await axiosInstance3.get(
        `http://localhost:3000/api/movie_cast/find_by_movie_id/` + id,
      );
      // setMovie(request.data.data.items);
      console.log('cast: ', request.data);
      setCast(request.data.slice(0, 5));
      return request;
    }
    fetchData(movieData?.movie_id);
    fetchDataCast(movieData?.movie_id);
  }, []);

  const trailer =
    'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761';

  const movieThumbnail =
    'https://www.ntdaily.com/wp-uploads/2019/04/endgame-scaled-680x365_c.jpg';
  const [open, setOpen] = React.useState(false);
  const [openDialog, handleDisplay] = React.useState(false);

  const handleClose = () => {
    handleDisplay(false);
  };

  const openDialogBox = () => {
    handleDisplay(true);
  };

  useEffect(() => {

    async function fetchData() {
      const request = await axiosInstance3.get(
          `http://localhost:3000/api/user/profiles/my_list?profile_id=${userDetails?.id}&page=1&pageSize=9999`,
      );
      // setMovie(request.data.data.items);
      console.log('id moives userList: ', request.data.items[0].MyListMovies);
      setIdMovieMyList(request.data.items[0].MyListMovies.map((item)=>item.movie_id))
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log("id movie list check: ", idMovieMyList)
    console.log("id movie data check: ", movieData?.movie_id)
    if (idMovieMyList.indexOf(movieData?.movie_id) === -1) {
      setIsInMyList(false)
      console.log("check no exist in mylist")
    } else {
      setIsInMyList(true)
      console.log("check have exist in mylist")
    }
  }, [idMovieMyList]);

  const hanleAddMyList = async () => {

    const request = await axiosInstance3
        .post(`http://localhost:3000/api/user/profile/my_list?profile_id=${userDetails?.id}&movie_id=${movieData?.movie_id}`)
        .then(function (response) {
          if (response.data.statusCode === 200) {
            // to handle add success
            setIsInMyList(true)
            async function fetchData() {
              const request = await axiosInstance3.get(
                  `http://localhost:3000/api/user/profiles/my_list?profile_id=${userDetails?.id}&page=1&pageSize=9999`,
              );
              // setMovie(request.data.data.items);
              console.log('id moives userList: ', request.data.items[0].MyListMovies);
              setIdMovieMyList(request.data.items[0].MyListMovies.map((item)=>item.movie_id))
            }

            fetchData();
            console.log(`adding movieid: ${movieData?.movie_id} success`)
          }
        })
        .catch(function (error) {
          console.log(error);
          alert('adding failed');
        });

  };

  const hanleRemoveMyList = async () => {

    const request = await axiosInstance3
        .delete(`http://localhost:3000/api/user/profiles/my_list?profile_id=${userDetails?.id}&movie_id=${movieData?.movie_id}`)
        .then(function (response) {
          if (response.data.statusCode === 200) {
            // to handle add success
            console.log(`remove movieid: ${movieData?.movie_id} success`)
            setIsInMyList(false)
            async function fetchData() {
              const request = await axiosInstance3.get(
                  `http://localhost:3000/api/user/profiles/my_list?profile_id=${userDetails?.id}&page=1&pageSize=9999`,
              );
              // setMovie(request.data.data.items);
              console.log('id moives userList: ', request.data.items[0].MyListMovies);
              setIdMovieMyList(request.data.items[0].MyListMovies.map((item)=>item.movie_id))
            }

            fetchData();
          }
        })
        .catch(function (error) {
          console.log(error);
          alert('remove failed');
        });

  };

  const dialogStyle = {
    padding: '20px',
  };
  return (
      <div style={{width:285}}>
        <div
            className="listItem"
            style={{left: isHovered && index * 280 - 50 + index * 2.5}}
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
        >
          <img
              src={movieData?.thumbnail ? movieData.thumbnail : movieThumbnail}
              alt=""
          />
          {isHovered && (
              <>
                <video
                    className="video-thumbnail"
                    src={movieData?.trailer ? movieData.trailer : trailer}
                    autoPlay={true}
                    loop
                />
                <div className="itemInfo">
                  <div className="icons">
                    <Link
                        to={`/player/${movieData?.movie_id}`}
                        state={{data: movieData}}
                    >
                      <PlayArrow className="icon"/>
                    </Link>
                    <Routes>
                      <Route path="/player" element={<PlayerPage/>}/>
                    </Routes>
                    {isInMyList ? (
                        <div onClick={hanleRemoveMyList}><CheckCircleOutline className="icon"/></div>
                    ) : (
                        <div onClick={hanleAddMyList}><Add className="icon"/></div>
                    )}
                    {/* <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" /> */}

                    <InfoRounded className="icon" onClick={openDialogBox}/>
                  </div>
                  <div className="itemInfoTop">
                    <span>{movieData?.runtime} mins</span>
                    {movieData?.isAdult && <span className="limit">+16</span>}
                    {!movieData?.isAdult && <span className="limit">+3</span>}
                    <span>{movieData?.release_date.split('-')[0]}</span>
                  </div>
                  <div className="desc">{movieData?.tagline}</div>
                  <div className="genre">
                    {/* {movie.movie_genres ? movie.movie_genres[0].genre.genre_name : ''} */}
                    {movie &&
                        movie.movie_genres.map((genre) => (
                            <span>{genre.genre.genre_name}, </span>
                        ))}
                  </div>
                </div>
              </>
          )}
          <Dialog
              onMouseEnter={() => setIsHovered(false)}
              onMouseLeave={() => setIsHovered(false)}
              className="dialog-detail"
              onClose={handleClose}
              open={openDialog}
          >
            <div className="detail-general">
              <div className="video-info">
                <IconButton className="on-close" onClick={handleClose}>
                  <CloseOutlined className="close-outlined"></CloseOutlined>
                </IconButton>
                <video
                    className="video-custom"
                    autoPlay
                    muted
                    loop
                    src={movieData?.trailer ? movieData.trailer : trailer}
                ></video>
                <div className="navigation-general">
                  <h1 className="title-movie">{movieData?.title}</h1>
                  <div className="navigation-button">
                    <div className="icons">
                      <Link
                          to={`/player/${movieData?.movie_id}`}
                          state={{data: movieData}}
                      >
                        <IconButton className="icon-button-custom">
                          <PlayArrow/>
                        </IconButton>
                      </Link>
                      <Routes>
                        <Route path="/player" element={<PlayerPage/>}/>
                      </Routes>

                      {/* <IconButton className="icon-button-custom">
                    <ThumbUpAltOutlined />
                  </IconButton> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="detail-info">
                <div className="sub-detail-1">
                  {movieData?.release_date.split('-')[0] > '2000' && (
                      <span className="new">New</span>
                  )}
                  <span className="time">{movieData?.runtime} mins</span>
                  <span>Comedy</span>
                  <span>{movieData?.release_date.split('-')[0]}</span>
                </div>
                <div className="limit-age">
                  {movieData?.isAdult && <span className="limit">+16</span>}
                  {!movieData?.isAdult && <span className="limit">+3</span>}
                </div>
                <p className="description">{movieData?.overview}</p>
                <div className="addtional-field">
              <span>
                <span className="title-additonal">Cast: </span>
                {cast &&
                    cast.map((caster) => <span>{caster.character_name}, </span>)}
              </span>
                  <span>
                <span className="title-additonal">Genres: </span>
                    {movie &&
                        movie.movie_genres.map((genre) => (
                            <span>{genre.genre.genre_name}, </span>
                        ))}
              </span>
                </div>
              </div>

              {movieData?.seriesId && (
                  <div className="movie-chapter">
                    <span className="movie-chapter-title">Episodes</span>
                    <div className="gap"></div>
                    <div className="episodes">
                      <hr size="1"/>
                      <div className="chapter-row">
                        <div className="num-of-chapter">
                          <span>1</span>
                        </div>
                        <div className="chapter-image">
                          <img src={movieData?.thumbnail} alt=""/>
                        </div>
                        <div className="chapter-title">
                          <div>
                            <span>I Know What You Did Last Summner</span>
                          </div>
                          <div>
                            <span className="chapter-time">62m</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              )}
            </div>
          </Dialog>
        </div>
      </div>

    // </Link>
  );
}

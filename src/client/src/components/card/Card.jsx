import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoPlayCircleSharp } from 'react-icons/io5';
import { AiOutlinePlus, AiOutlinePlusCircle } from 'react-icons/ai';
import { RiThumbUpFill, RiThumbDownFill } from 'react-icons/ri';
import { BiChevronDown } from 'react-icons/bi';
import { BsCheck, BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';

import './Card.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import PlayerPage from '../../pages/player/PlayerPage';
import { IconButton } from '@mui/material';
import {
  Add,
  CheckCircleOutline,
  CloseOutlined,
  PlayArrow,
  ThumbUpAltOutlined,
} from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import { axiosInstance3 } from '../../axios';

export default React.memo(function Card({
  index,
  movieData,
  isLiked = false,
  isVip = false,
  isSeries = false,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [openDialog, handleDisplay] = useState(false);
  const [fullDataMovie, setFullDataMovie] = useState(null);
  // const [isSeries, setIsSeries] = useState(false);
  const [idMovieMyList, setIdMovieMyList] = useState([]);
  const [isInMyList, setIsInMyList] = useState(false);
  const [series, setSeries] = useState();
  const [idSeriesMyList, setIdSeriesMyList] = useState([]);

  const userDetails = JSON.parse(localStorage.getItem('user'));
  console.log('userDetails at item top list: ', userDetails);
  const handleClose = () => {
    handleDisplay(false);
  };

  useEffect(() => {
    async function fetchMovieById(id) {
      const request = await axiosInstance3.get(
        `http://localhost:3000/api/movie/findById?id=${movieData.movie_id}`,
      );
      console.log('movie: ', request.data.data);
      setFullDataMovie(request.data.data);
      // if (request.data.data.isSeries === true) {
      //     setIsSeries(true);
      // }
    }

    if (!isSeries) {
      fetchMovieById();
    }
  }, []);

  useEffect(() => {
    async function fetchSeriesById() {
      const request = await axiosInstance3.get(
        `http://localhost:3000/api/movie/series/${movieData.seriesId}`,
      );
      console.log('Series: ', request.data.data);
      setSeries(request.data.data);
    }

    if (isSeries) {
      fetchSeriesById();
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const request = await axiosInstance3.get(
        `http://localhost:3000/api/user/profiles/my_list?profile_id=${userDetails?.id}&page=1&pageSize=9999`,
      );
      // setMovie(request.data.data.items);
      console.log('id moives userList: ', request.data.items[0]?.MyListMovies);
      setIdMovieMyList(
        request.data.items[0]?.MyListMovies.map((item) => item.movie_id),
      );
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const request = await axiosInstance3.get(
        `http://localhost:3000/api/user/profiles/series?profile_id=${userDetails?.id}`,
      );
      // setMovie(request.data.data.items);
      console.log('id series userList: ', request.data.MySeries);
      setIdSeriesMyList(request.data.MySeries.map((item) => item.seriesId));
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!isSeries) {
      console.log('id movie list check: ', idMovieMyList);
      console.log('id movie data check: ', movieData?.movie_id);
      if (idMovieMyList?.indexOf(movieData?.movie_id) === -1) {
        setIsInMyList(false);
        console.log('check no exist in mylist');
      } else {
        setIsInMyList(true);
        console.log('check have exist in mylist');
      }
    }
  }, [idMovieMyList]);

  useEffect(() => {
    if (isSeries) {
      console.log('id movie list check: ', idMovieMyList);
      console.log('id series data check: ', movieData?.seriesId);
      if (idSeriesMyList.indexOf(movieData?.seriesId) === -1) {
        setIsInMyList(false);
        console.log('check no exist in mylist');
      } else {
        setIsInMyList(true);
        console.log('check have exist in mylist');
      }
    }
  }, [idSeriesMyList]);

  const hanleAddMyList = async () => {
    if (!isSeries) {
      // add to movies to my list
      const request = await axiosInstance3
        .post(
          `http://localhost:3000/api/user/profile/my_list?profile_id=${userDetails?.id}&movie_id=${movieData?.movie_id}`,
        )
        .then(function (response) {
          if (response.data.statusCode === 200) {
            // to handle add success
            setIsInMyList(true);

            async function fetchData() {
              const request = await axiosInstance3.get(
                `http://localhost:3000/api/user/profiles/my_list?profile_id=${userDetails?.id}&page=1&pageSize=9999`,
              );
              // setMovie(request.data.data.items);
              console.log(
                'id moives userList: ',
                request.data.items[0].MyListMovies,
              );
              setIdMovieMyList(
                request.data.items[0].MyListMovies.map((item) => item.movie_id),
              );
            }

            fetchData();
            console.log(`adding movieid: ${movieData?.movie_id} success`);
          }
        })
        .catch(function (error) {
          console.log(error);
          // alert('adding failed');
        });
    } else {
      // add to series to my list
      const request = await axiosInstance3
        .post(
          `http://localhost:3000/api/user/profiles/series?profile_id=${userDetails?.id}&seriesId=${movieData?.seriesId}`,
        )
        .then(function (response) {
          // to handle add success
          setIsInMyList(true);
          async function fetchData() {
            const request = await axiosInstance3.get(
              `http://localhost:3000/api/user/profiles/series?profile_id=${userDetails?.id}`,
            );
            // setMovie(request.data.data.items);
            setSeries(request.data.MySeries);
            console.log('url series lisst: ', request.data.MySeries);
            // setIdMovieMyList(request.data.items[0].MyListMovies.map((item) => item.movie_id))
          }
          fetchData();
          console.log(`adding movieid: ${movieData?.movie_id} success`);

          console.log('url series: ', series);
        })
        .catch(function (error) {
          console.log(error);
          // alert('adding failed');
        });
    }
  };

  const hanleRemoveMyList = async () => {
    if (!isSeries) {
      //handle remove movies from my list
      const request = await axiosInstance3
        .delete(
          `http://localhost:3000/api/user/profiles/my_list?profile_id=${userDetails?.id}&movie_id=${movieData?.movie_id}`,
        )
        .then(function (response) {
          if (response.data.statusCode === 200) {
            // to handle remove success
            console.log(`remove movieid: ${movieData?.movie_id} success`);
            setIsInMyList(false);

            async function fetchData() {
              const request = await axiosInstance3.get(
                `http://localhost:3000/api/user/profiles/my_list?profile_id=${userDetails?.id}&page=1&pageSize=9999`,
              );
              // setMovie(request.data.data.items);
              console.log(
                'id moives userList: ',
                request.data.items[0].MyListMovies,
              );
              setIdMovieMyList(
                request.data.items[0].MyListMovies.map((item) => item.movie_id),
              );
            }

            fetchData();

            // window.location.reload(true);
          }
        })
        .catch(function (error) {
          console.log(error);
          // alert('remove failed');
        });
    } else {
      // dang lam cho remove series nhung chua co API
      // remove movie from my list
      const request = await axiosInstance3
        .delete(
          `http://localhost:3000/api/user/profiles/series?profile_id=${userDetails?.id}&seriesId=${movieData?.seriesId}`,
        )
        .then(function (response) {
          if (response.data.statusCode === 200) {
            // to handle add success
            console.log(`remove seriesID: ${movieData?.movie_id} success`);
            setIsInMyList(false);

            async function fetchData() {
              const request = await axiosInstance3.get(
                `http://localhost:3000/api/user/profiles/series?profile_id=${userDetails?.id}`,
              );
              // setMovie(request.data.data.items);
              console.log('id series userList: ', request.data.MySeries);
              console.log('url', document.referrer);
              setIdSeriesMyList(
                request.data.MySeries.map((item) => item.seriesId),
              );
            }

            fetchData();
            // if(document.referrer.includes("/myList"))
            //     window.location.reload(true);
          }
        })
        .catch(function (error) {
          console.log(error);
          // alert('adding failed');
        });
    }
  };

  const openDialogBox = () => {
    handleDisplay(true);
  };

  const trailer =
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  const base_url = 'https://image.tmdb.org/t/p/original/';

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/player/${movieData.movie_id}`} state={{ data: movieData }}>
        <img
          className={'imgItem'}
          // src={`${base_url}${movieData.image_path}`}
          src={
            movieData.image ||
            'https://www.ntdaily.com/wp-uploads/2019/04/endgame-scaled-680x365_c.jpg'
          }
          alt="card"
          // onClick={() => navigate(`/player/?url=${movieData.video}`)}//dang lam
        />
      </Link>
      {isVip && (
        <Link to={`/player/${movieData.movie_id}`} state={{ data: movieData }}>
          <div className={'vipTag'}>
            {/*<svg xmlns="http://www.w3.org/2000/svg" className="svg-icon"*/}
            {/*     viewBox="0 0 1024 1024" version="1.1">*/}
            {/*    <path*/}
            {/*        d="M896 896H128a128 128 0 0 1-128-128V256a128 128 0 0 1 128-128h768a128 128 0 0 1 128 128v512a128 128 0 0 1-128 128zM128 213.333333a42.666667 42.666667 0 0 0-42.666667 42.666667v512a42.666667 42.666667 0 0 0 42.666667 42.666667h768a42.666667 42.666667 0 0 0 42.666667-42.666667V256a42.666667 42.666667 0 0 0-42.666667-42.666667z m592.213333 465.493334a42.666667 42.666667 0 0 1-42.666666-42.666667V387.84a42.666667 42.666667 0 0 1 42.666666-42.666667H768a123.306667 123.306667 0 0 1 0 246.186667h-6.4v45.226667a42.666667 42.666667 0 0 1-41.386667 42.24z m42.666667-248.32v75.946666H768a37.973333 37.973333 0 0 0 0-75.52z m-213.333333 248.32a42.666667 42.666667 0 0 1-42.666667-42.666667V387.84a42.666667 42.666667 0 0 1 85.333333 0v248.32a42.666667 42.666667 0 0 1-42.24 42.666667z m-240.213334 0a42.666667 42.666667 0 0 1-39.253333-25.6L161.706667 404.906667a42.666667 42.666667 0 0 1 78.506666-34.133334l66.133334 151.04 54.186666-148.48a42.666667 42.666667 0 1 1 80.213334 29.013334L349.866667 650.666667a42.666667 42.666667 0 0 1-38.826667 28.16z"/>*/}
            {/*</svg>*/}
            <img src={require('../../assets/vip.jpg')} alt="img vip" />
          </div>
        </Link>
      )}

      {isHovered && (
        <div className="hover">
          <Link
            to={`/player/${movieData.movie_id}`}
            state={{ data: movieData }}
            style={{ height: '236px' }}
          >
            <div className="image-video-container">
              <img
                // src={`${base_url}${movieData.image_path}`}
                src={movieData.image}
                alt="card"
                // onClick={() => navigate(`/player/?url=${movieData.video}`)}//dang lam
              />
              <video
                src={movieData.trailer || trailer}
                autoPlay={true}
                loop
                muted
                // onClick={() => navigate(`/player/?url=${movieData.video}`)} // dang lam
              />
            </div>
          </Link>
          <div className="info-container flex column">
            <h3
              className="name"
              // onClick={() => navigate("/player")}
            >
              {movieData.title}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <Link
                  to={`/player/${movieData.movie_id}`}
                  state={{ data: movieData }}
                >
                  <IoPlayCircleSharp title="Play" />
                </Link>

                {/*<Routes>*/}
                {/*    <Route path="/player" element={<PlayerPage/>}/>*/}
                {/*</Routes>*/}

                {/*{isLiked ? (*/}
                {/*    <BsCheckCircleFill*/}
                {/*        title="Remove from List"*/}
                {/*        // onClick={() =>*/}
                {/*        //     dispatch(*/}
                {/*        //         removeMovieFromLiked({movieId: movieData.id, email})*/}
                {/*        //     )*/}
                {/*        // }*/}
                {/*    />*/}
                {/*) : (*/}
                {/*    <AiOutlinePlus*/}
                {/*        title="Add to my list"*/}
                {/*        // onClick={addToList}*/}
                {/*    />*/}
                {/*)}*/}

                {isInMyList ? (
                  <div onClick={hanleRemoveMyList}>
                    <BsCheckCircleFill className="icon" />
                  </div>
                ) : (
                  <div onClick={hanleAddMyList}>
                    <AiOutlinePlusCircle className="icon" />
                  </div>
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" onClick={openDialogBox} />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex flex-wrap">
                {/*dang lam mang cho genre*/}
                {fullDataMovie &&
                  fullDataMovie.movie_genres.map((genre) => (
                    <li key={genre.genre_id}>{genre.genre.genre_name}</li>
                  ))}
                {/*{movieData.movie_genres.map((genre) => (*/}
                {/*    <li key={genre}>{genre.genre_id}</li>*/}
                {/*))}*/}
              </ul>
            </div>
          </div>
        </div>
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
              src={trailer}
            ></video>
            <div className="navigation-general">
              <h1 className="title-movie">
                {isSeries ? movieData.seriesName : movieData.title}
              </h1>
              <div className="navigation-button">
                <div className="icons">
                  <Link
                    to={`/player/${movieData.movie_id}`}
                    state={{ data: movieData }}
                  >
                    <IconButton className="icon-button-custom">
                      <PlayArrow />
                    </IconButton>
                  </Link>
                  <Routes>
                    <Route path="/player" element={<PlayerPage />} />
                  </Routes>
                  {/*<IconButton className='icon-button-custom'>*/}
                  {/*    <Add/>*/}
                  {/*</IconButton>*/}
                  {/*<IconButton className='icon-button-custom'>*/}

                  {/*    <ThumbUpAltOutlined/>*/}
                  {/*</IconButton>*/}
                </div>
              </div>
            </div>
          </div>
          <div className="detail-info">
            <div className="sub-detail-1">
              <span className="new">New</span>
              {!isSeries && (
                <span className="time">{`${movieData.runtime} minutes`}</span>
              )}
              {!isSeries && <span>Comedy</span>}
              {!isSeries && <span>1999</span>}
            </div>
            {!isSeries && movieData.isAdult && (
              <div className="limit-age">
                <span className="limit">+16</span>
              </div>
            )}
            <p className="description">
              {isSeries ? movieData.seriesDescription : movieData.overview}
            </p>
            <div className="addtional-field">
              <span>
                <span className="title-additonal">Cast:</span> Hulk, Batman,
                Thor, Ironman
              </span>
              <span>
                <span className="title-additonal">Genres:</span> Action Film,
                Romantic Film
              </span>
            </div>
          </div>
          {isSeries && (
            <div className="movie-chapter">
              <span className="movie-chapter-title">Episodes</span>
              <div className="gap"></div>
              {series?.movies &&
                series.movies.map((movie, index) => (
                  <div key={index} className="episodes">
                    <hr size="1" />
                    <Link
                      to={`/player/${movie.movie_id}`}
                      state={{ data: movie }}
                    >
                      {' '}
                      <div className="chapter-row">
                        <div className="num-of-chapter">
                          <span>{movie.seriesOrder}</span>
                        </div>
                        <div className="chapter-image">
                          <img src={movie.image} alt="" />
                        </div>
                        <div className="chapter-title">
                          <div>
                            <span>{movie.title}</span>
                          </div>
                          <div>
                            <span className="chapter-time">{`${movie.runtime}m`}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          )}
        </div>
      </Dialog>
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
    left: -60px;
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
      //padding-top: 100px;
      //padding-top: 1rem;
      //padding-bottom: 1rem;
      //padding-left: 1rem;
      //padding-right: 1rem;
      padding: 1rem;
      gap: 0.5rem;
      //gap: 100px;
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

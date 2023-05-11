import './highLight.scss';
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
  InfoOutlined,
  InfoRounded,
  CloseOutlined,
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

export default function HighLight({ type }) {
  const trailer =
    'https://firebasestorage.googleapis.com/v0/b/pegacine-897de.appspot.com/o/items%2FStar%20Wars%20Episode%20III%20Revenge%20of%20the%20Sith%20%20Trailer_1080p.mp4?alt=media&token=9691fd68-de35-45f0-b0a5-d57a56c3b6db';

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
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);
  useEffect(() => {
    async function fetchData(id) {
      const request = await axiosInstance3.get(
        `http://localhost:3000/api/movie/findById?id=11`,
      );
      // setMovie(request.data.data.items);
      console.log('movie: ', request.data.data);
      setMovie(request.data.data);
      return request;
    }
    async function fetchDataCast(id) {
      const request = await axiosInstance3.get(
        `http://localhost:3000/api/movie_cast/find_by_movie_id/11`,
      );
      // setMovie(request.data.data.items);
      console.log('cast: ', request.data);
      setCast(request.data.slice(0, 5));
      return request;
    }
    fetchData(movie?.movie_id);
    fetchDataCast(movie?.movie_id);
  }, []);
  return (
    <div className="highlight">
      {type && (
        <div className="category">
          <span>{type === 'movie' ? 'Movies' : 'Series'}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img
        src="https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/326123313_549840593832627_4239634128795403636_n.png?_nc_cat=108&ccb=1-7&_nc_sid=e3f864&_nc_ohc=0lVPMpTf08UAX87ciwi&_nc_ht=scontent-hkg4-1.xx&oh=00_AfCc97HH5ysVEFyzX1MaZiSJarhOwNCaIq383RIe-KwIQw&oe=646176A7"
        alt=""
      />
      <div className="info">
        {/* <img src="" alt="" /> */}
        <span className="desc">{movie?.overview}</span>
        <div className="buttons">
          <Link to={`/player/${movie?.movie_id}`} state={{ data: movie }}>
            <button className="play">
              <PlayArrow className="play-arrow" />
              <span>Play</span>
            </button>
          </Link>
          <Routes>
            <Route path="/player" element={<PlayerPage />} />
          </Routes>

          <button className="more" onClick={openDialogBox}>
            <InfoOutlined className="info-outlined" />
            <span>Info</span>
          </button>
        </div>
      </div>
      <Dialog className="dialog-detail" onClose={handleClose} open={openDialog}>
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
              src={movie?.trailer ? movie.trailer : trailer}
            ></video>
            <div className="navigation-general">
              <h1 className="title-movie">{movie?.title}</h1>
              <div className="navigation-button">
                <div className="icons">
                  <Link
                    to={`/player/${movie?.movie_id}`}
                    state={{ data: movie }}
                  >
                    <IconButton className="icon-button-custom">
                      <PlayArrow />
                    </IconButton>
                  </Link>
                  <Routes>
                    <Route path="/player" element={<PlayerPage />} />
                  </Routes>
                  <IconButton className="icon-button-custom">
                    <Add />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-info">
            <div className="sub-detail-1">
              {movie?.release_date.split('-')[0] > '2000' && (
                <span className="new">New</span>
              )}
              <span className="time">{movie?.runtime} mins</span>
              <span>Comedy</span>
              <span>{movie?.release_date.split('-')[0]}</span>
            </div>
            <div className="limit-age">
              {movie?.isAdult && <span className="limit">+16</span>}
              {!movie?.isAdult && <span className="limit">+3</span>}
            </div>
            <p className="description">{movie?.overview}</p>
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

          {movie?.seriesId && (
            <div className="movie-chapter">
              <span className="movie-chapter-title">Episodes</span>
              <div className="gap"></div>
              <div className="episodes">
                <hr size="1" />
                <div className="chapter-row">
                  <div className="num-of-chapter">
                    <span>1</span>
                  </div>
                  <div className="chapter-image">
                    <img src={movie?.thumbnail} alt="" />
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
  );
}

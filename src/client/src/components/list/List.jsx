import {
  Add,
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
  CloseOutlined,
  PlayArrow,
  ThumbUpAltOutlined,
} from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
import ItemList from '../itemList/ItemList';
import './list.scss';
import Dialog from '@mui/material/Dialog';
import { IconButton } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import PlayerPage from '../../pages/player/PlayerPage';
import Card from '../card/Card';
import { axiosInstance3 } from '../../axios';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function List({ movieDataList, title, genreId = '' }) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [openDialog, handleDisplay] = useState(false);
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  console.log('movieDataList: ', movieDataList);

  async function fetchMoviesData() {
    const request = await axiosInstance3.get(
      `http://localhost:3000/api/movie/find_by_movie_genres?genre_id=${genreId}&page=${pageNumber}&pageSize=30`,
    );
    setMovies(request.data.data.items);
    setTotalPages(request.data.data.meta.totalPages);
    console.log('movieDataList at Home: ', request.data.data.items);
  }

  const fetchData = () => {
    setPageNumber((prev) => prev + 1);
    async function fetchData() {
      const request = await axiosInstance3.get(
        `http://localhost:3000/api/movie/find_by_movie_genres?genre_id=${genreId}&page=${pageNumber}&pageSize=10`,
      );
      setMovies((prev) => [...prev, ...request.data.data.items]);
      setTotalPages(request.data.data.meta.totalPages);
      console.log(request.data.data.items);
      return request;
    }
    console.log('next');
    fetchData();
  };

  const handleClose = () => {
    handleDisplay(false);
  };

  const openDialogBox = () => {
    fetchMoviesData();
    handleDisplay(true);
  };

  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === 'left' && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === 'right' && slideNumber < 5) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle" onClick={openDialogBox}>
        {title}
      </span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick('left')}
          style={{ display: !isMoved && 'none' }}
        />
        {movieDataList.length && (
          <div className="container" ref={listRef}>
            {movieDataList[0] && (
              <div>
                <ItemList index={0} movieData={movieDataList[0]} />
              </div>
            )}
            {movieDataList[1] && (
              <div>
                <ItemList index={1} movieData={movieDataList[1]} />
              </div>
            )}
            {movieDataList[2] && (
              <div>
                <ItemList index={2} movieData={movieDataList[3]} />
              </div>
            )}
            {movieDataList[3] && (
              <div>
                <ItemList index={3} movieData={movieDataList[3]} />
              </div>
            )}
            {movieDataList[4] && (
              <div>
                <ItemList index={4} movieData={movieDataList[4]} />
              </div>
            )}
            {movieDataList[5] && (
              <div>
                <ItemList index={5} movieData={movieDataList[5]} />
              </div>
            )}
            {movieDataList[6] && (
              <div>
                <ItemList index={6} movieData={movieDataList[6]} />
              </div>
            )}
            {movieDataList[7] && (
              <div>
                <ItemList index={7} movieData={movieDataList[7]} />
              </div>
            )}
            {movieDataList[8] && (
              <div>
                <ItemList index={8} movieData={movieDataList[8]} />
              </div>
            )}
            {movieDataList[9] && (
              <div>
                <ItemList index={9} movieData={movieDataList[9]} />
              </div>
            )}

            {/* <ItemList index={1} movieData={movieDataList[1]} />
            <ItemList index={2} movieData={movieDataList[2]} />
            <ItemList index={3} movieData={movieDataList[3]} />
            <ItemList index={4} movieData={movieDataList[4]} />
            <ItemList index={5} movieData={movieDataList[5]} />
            <ItemList index={6} movieData={movieDataList[6]} />
            <ItemList index={7} movieData={movieDataList[7]} />
            <ItemList index={8} movieData={movieDataList[8]} />
            <ItemList index={9} movieData={movieDataList[9]} /> */}
          </div>
        )}
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick('right')}
        />
      </div>

      <Dialog
        className="dialog-detail"
        onClose={handleClose}
        open={openDialog}
        maxWidth="80vw"
      >
        <div className={'dialogContent'}>
          <IconButton className="on-close" onClick={handleClose}>
            <CloseOutlined className="close-outlined"></CloseOutlined>
          </IconButton>

          <div className={'titleDialog'}>Action Movie</div>
          <div className={'moviesContainer'}>
            {movies.map((movie, index) => {
              return (
                <Card
                  movieData={movie}
                  index={index}
                  key={movie.movie_id}
                  isLiked={true}
                />
              );
            })}
            <InfiniteScroll
              dataLength={movies.length} //This is important field to render the next data
              next={fetchData}
              hasMore={totalPages >= pageNumber}
            ></InfiniteScroll>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

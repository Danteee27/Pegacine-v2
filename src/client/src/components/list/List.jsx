import {
    Add,
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined, CloseOutlined, PlayArrow, ThumbUpAltOutlined,
} from '@mui/icons-material';
import React, {useEffect, useRef, useState} from 'react';
import ItemList from '../itemList/ItemList';
import './list.scss';
import Dialog from "@mui/material/Dialog";
import {IconButton} from "@mui/material";
import {Link, Route, Routes} from "react-router-dom";
import PlayerPage from "../../pages/player/PlayerPage";
import Card from "../card/Card";
import {axiosInstance3} from "../../axios";

export default function List() {
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const [openDialog, handleDisplay] = useState(false);
    const [movies, setMovies] = useState([]);

    async function fetchMoviesData() {
        const request = await axiosInstance3.get('http://localhost:3000/api/user/profiles/my_list?profile_id=2&page=1&pageSize=999');
        console.log("request: ", request.data.items[0].MyListMovies)
        setMovies(request.data.items[0].MyListMovies);
        return request;
    }

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
            <span className="listTitle" onClick={openDialogBox}>Action movie</span>
            <div className="wrapper">
                <ArrowBackIosOutlined
                    className="sliderArrow left"
                    onClick={() => handleClick('left')}
                    style={{display: !isMoved && 'none'}}
                />
                <div className="container" ref={listRef}>
                    <ItemList index={0}/>
                    <ItemList index={1}/>
                    <ItemList index={2}/>
                    <ItemList index={3}/>
                    <ItemList index={4}/>
                    <ItemList index={5}/>
                    <ItemList index={6}/>
                    <ItemList index={7}/>
                    <ItemList index={8}/>
                    <ItemList index={9}/>
                </div>
                <ArrowForwardIosOutlined
                    className="sliderArrow right"
                    onClick={() => handleClick('right')}
                />
            </div>

            <Dialog className="dialog-detail" onClose={handleClose} open={openDialog} maxWidth={"80vw"}>
                <div className={"dialogContent"}>
                    <IconButton className='on-close' onClick={handleClose}>
                        <CloseOutlined className='close-outlined'>
                        </CloseOutlined>
                    </IconButton>

                    <div className={"titleDialog"}>Action Movie</div>
                    <div className={"moviesContainer"}>
                        {movies.map((movie, index) => {
                            return (<Card
                                movieData={movie}
                                index={index}
                                key={movie.movie_id}
                                isLiked={true}
                            />);
                        })}
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

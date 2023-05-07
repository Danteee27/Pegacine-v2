import './itemList.scss';
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
  InfoOutlined,
  InfoRounded,
  CloseOutlined
} from '@mui/icons-material';
import {Link, Route, Routes} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import requests from '../../Requests';
import PlayerPage from "../../pages/player/PlayerPage";
import { Button, IconButton } from '@mui/material';
export default function ItemList({ index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
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
   const dialogStyle = {
      padding: "20px",
   };
  return (
    // <Link to={{ pathname: '/player', movie: movie }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movieThumbnail} alt="" />
        {isHovered && (
          <>
            <video className='video-thumbnail' src={trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                
                  <Link to="../player">
                      <PlayArrow className="icon"/>
                  </Link>
                  <Routes>
                      <Route path="/player" element={<PlayerPage />} />
                  </Routes>
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />

                <InfoRounded className='icon'  onClick = {openDialogBox}/>
              </div>
              <div className="itemInfoTop">
                <span>1 hour 14 mins</span>
                <span className="limit">+16</span>
                <span>1999</span>
              </div>
              <div className="desc">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Praesentium hic rem eveniet error possimus, neque ex doloribus.
              </div>
              <div className="genre">Action</div>
              
            </div>
            
          </>
        )}
        <Dialog  onMouseEnter={() => setIsHovered(false)}
        onMouseLeave={() => setIsHovered(false)} className="dialog-detail" onClose = {handleClose} open = {openDialog}>
                <div className='detail-general'>

                <div className='video-info'>
                 
                  <IconButton className='on-close' onClick={handleClose}><CloseOutlined className='close-outlined'></CloseOutlined></IconButton>
                  <video className='video-custom' autoPlay muted loop src={trailer}> </video>
                  <div className='navigation-general'>

                  <h1 className='title-movie'>Marvel Endgame</h1>
                  <div className='navigation-button'>
                    <div className="icons">
                    <Link to="../player">
                          <IconButton className='icon-button-custom'>
                              <PlayArrow />
                          </IconButton>

                    </Link>
                    <Routes>
                          <Route path="/player" element={<PlayerPage />} />
                    </Routes>
                     <IconButton className='icon-button-custom'>
                          <Add />
                    </IconButton>
                    <IconButton className='icon-button-custom'>

                              <ThumbUpAltOutlined />
                    </IconButton>
                  </div></div>
                  </div>

                </div>
                <div className='detail-info'>
                    <div className='sub-detail-1'>
                      <span className='new'>New</span>
                      <span className='time'>10 minutes</span>
                      <span>Comedy</span>
                      <span>1999</span>
                    </div>
                    <div className='limit-age'>
                      <span className="limit">+16</span>

                    </div>
                    <p className='description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas est repudiandae consequatur? Minus deleniti natus deserunt, nobis itaque eveniet reprehenderit nesciunt, beatae nam quos provident repellendus ipsam fuga, quod non?</p>
                    <div className='addtional-field'>
                      <span><span className='title-additonal'>Cast:</span> Hulk, Batman, Thor, Ironman</span>
                      <span><span className='title-additonal'>Genres:</span> Action Film, Romantic Film</span>
                    </div>
                  </div>

                  <div className='movie-chapter'>
                  <span className='movie-chapter-title'>Episodes</span>
                  <div className='gap'></div>
                  <div className='episodes'>
                    <hr size='1'/>
                    <div className='chapter-row'>
                      <div className='num-of-chapter'>
                        <span>1</span>
                        </div>
                        <div className="chapter-image">
                          <img src={movieThumbnail} alt="" />
                        </div>
                        <div className='chapter-title'>
                          <div>

                          <span>I Know What You Did Last Summner</span>
                          </div>
                          <div>

                          <span className='chapter-time'>62m</span>
                          </div>
                        </div>
                    </div>
                  </div>

                  <div className='episodes'>
                    <hr size='1'/>
                    <div className='chapter-row'>
                      <div className='num-of-chapter'>
                        <span>2</span>
                        </div>
                        <div className="chapter-image">
                          <img src={movieThumbnail} alt="" />
                        </div>
                        <div className='chapter-title'>
                          <div>

                          <span>I Know What You Did Last Summner</span>
                          </div>
                          <div>

                          <span className='chapter-time'>62m</span>
                          </div>
                        </div>
                    </div>
                  </div>

                  <div className='episodes'>
                    <hr size='1'/>
                    <div className='chapter-row'>
                      <div className='num-of-chapter'>
                        <span>3</span>
                        </div>
                        <div className="chapter-image">
                          <img src={movieThumbnail} alt="" />
                        </div>
                        <div className='chapter-title'>
                          <div>

                          <span>I Know What You Did Last Summner</span>
                          </div>
                          <div>

                          <span className='chapter-time'>62m</span>
                          </div>
                        </div>
                    </div>
                  </div>

                  <div className='episodes'>
                    <hr size='1'/>
                    <div className='chapter-row'>
                      <div className='num-of-chapter'>
                        <span>4</span>
                        </div>
                        <div className="chapter-image">
                          <img src={movieThumbnail} alt="" />
                        </div>
                        <div className='chapter-title'>
                          <div>

                          <span>I Know What You Did Last Summner</span>
                          </div>
                          <div>

                          <span className='chapter-time'>62m</span>
                          </div>
                        </div>
                    </div>
                  </div>
                  
                  
                </div>
                </div>

                
                    
              </Dialog>
      </div>
      
    // </Link>
  );
}

import React from 'react';
import styled from 'styled-components';
import './PlayerPage.css';
import {BsArrowLeft} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";

// import video from "../../assets/demoH06.mp4"
function Player() {
    // const navigate = useNavigate()

    const videoUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"

    return (
        <Container>
            <Navbar/>
            <div className={'player'}>
                <div className={'back'}>
                    {/*<BsArrowLeft onClick={()=>navigate(-1)}/>*/}
                    {/*<BsArrowLeft/>*/}
                </div>
                <div className={"videoPlayer"}>
                    <video src={videoUrl} autoPlay loop controls datatype={".mp4"}></video>
                </div>
            </div>
        </Container>
    );
}

export default Player;

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    background: #141414;

    .back {
      position: absolute;
      padding: 2rem;
      z-index: 11;
      background: transparent;

      svg {
        font-size: 1rem;
        color: snow;
        background: transparent;
        cursor: pointer;
      }
    }

    .videoPlayer{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    video {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      object-fit: cover;
      margin-top: 75px;
    }
  }
`;

import React from 'react'
import styled from "styled-components";
import "./PlayerPage.css"
import {BsArrowLeft} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import video from "../../assets/demoH06.mp4"
function Player() {

    // const navigate = useNavigate()

    return <Container>
        <div className={"player"}>
            <div className={"back"}>
                {/*<BsArrowLeft onClick={()=>navigate(-1)}/>*/}
                <BsArrowLeft />
            </div>
            <video src={video}  autoPlay loop controls >

            </video>
        </div>
    </Container>
}

export default Player

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
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
    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;

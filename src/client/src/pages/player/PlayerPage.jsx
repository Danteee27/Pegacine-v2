import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import './PlayerPage.css';
import {BsArrowLeft} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";

// import video from "../../assets/demoH06.mp4"
function Player() {
    // const navigate = useNavigate()

    const videoUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

    const video = useRef(null);
    const videoContainer = useRef(null)
    const watchBar = useRef(null);
    const timeRemaining = useRef(null);
    const progressBar = useRef(null)

    useEffect(() => {

        const f = (e) => {
            if (e.key == " ") {
                handlePlay()
            }
            if (e.key == "m") {
                console.log("click mute")
                handleVolume()
            }
        }
        document.addEventListener('keydown', event => f(event))

        video.current.addEventListener('timeupdate', () => {
            watchBar.current.style.width = (((video.current.currentTime / video.current.duration) * 100) + '%');

            //time remaining
            const totalSecondsRemaining = video.current.duration - video.current.currentTime;
            const time = new Date(null);
            time.setSeconds(totalSecondsRemaining);
            let hours = null;

            if (totalSecondsRemaining >= 3600) {
                hours = (time.getHours().toString()).padStart(2, '0');
            }

            let minutes = (time.getMinutes().toString()).padStart(2, '0');
            let seconds = (time.getSeconds().toString()).padStart(2, '0');
            timeRemaining.current.textContent = `${hours ? hours : ''}${minutes}:${seconds}`;


        })

        progressBar.current.addEventListener('click',(e)=>{
            const pos =
                (e.pageX - progressBar.current.offsetLeft - progressBar.current.offsetParent.offsetLeft) /
                progressBar.current.offsetWidth;
            video.current.currentTime = pos * video.current.duration;
        })

        return () => {
            console.log("remove roi nha")
            document.removeEventListener('keydown', event => f(event));
        }
    }, []);


    function handlePlay() {
        if (video.current.paused) {
            video.current.play();
        } else video.current.pause()
    }

    function handleRewind() {
        video.current.currentTime -= 10;
    }

    function handleFastForward() {
        video.current.currentTime += 10;
    }

    function handleVolume() {
        video.current.muted = !video.current.muted;
    }

    function handleFullScreen() {
        let elem = videoContainer.current;
        if (!document.fullscreenElement) {
            elem.requestFullscreen().catch((err) => {
                alert(
                    `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
                );
            });
        } else {
            document.exitFullscreen();
        }
    }

    return (<Container>
        {/*<Navbar/>*/}
        <div className={'player'}>
            <div className={'back'}>
                {/*<BsArrowLeft onClick={()=>navigate(-1)}/>*/}
                {/*<BsArrowLeft/>*/}
            </div>
            <div className={"videoPlayer videoContainer"} ref={videoContainer}>
                <video ref={video} src={videoUrl} autoPlay={true} loop datatype={".mp4"}></video>
                <div className={"controlsContainer"}>
                    <div className={"progressControls"}>
                        <div className={"progressBar"} ref={progressBar}>
                            <div className={"watchBar"} ref={watchBar}></div>
                            <div className={"playHead"}></div>
                        </div>
                        <div className={"timeRemaining"} ref={timeRemaining}>
                            00:00
                        </div>
                    </div>
                    <div className={"controls"}>
                        <button className={"play"} onClick={handlePlay}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 stroke-linejoin="round" className="feather feather-play">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                        </button>
                        <button className={"rewind"} onClick={handleRewind}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard"
                                 data-name="Back10">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M11.0198 2.04817C13.3222 1.8214 15.6321 2.39998 17.5557 3.68532C19.4794 4.97067 20.8978 6.88324 21.5694 9.09718C22.241 11.3111 22.1242 13.6894 21.2388 15.8269C20.3534 17.9643 18.7543 19.7286 16.714 20.8192C14.6736 21.9098 12.3182 22.2592 10.0491 21.8079C7.77999 21.3565 5.73759 20.1323 4.26989 18.3439C2.80219 16.5555 2 14.3136 2 12L0 12C-2.74181e-06 14.7763 0.962627 17.4666 2.72387 19.6127C4.48511 21.7588 6.93599 23.2278 9.65891 23.7694C12.3818 24.3111 15.2083 23.8918 17.6568 22.5831C20.1052 21.2744 22.0241 19.1572 23.0866 16.5922C24.149 14.0273 24.2892 11.1733 23.4833 8.51661C22.6774 5.85989 20.9752 3.56479 18.6668 2.02238C16.3585 0.479975 13.5867 -0.214319 10.8238 0.057802C8.71195 0.2658 6.70517 1.02859 5 2.2532V1H3V5C3 5.55229 3.44772 6 4 6H8V4H5.99999C7.45608 2.90793 9.19066 2.22833 11.0198 2.04817ZM2 4V7H5V9H1C0.447715 9 0 8.55229 0 8V4H2ZM14.125 16C13.5466 16 13.0389 15.8586 12.6018 15.5758C12.1713 15.2865 11.8385 14.8815 11.6031 14.3609C11.3677 13.8338 11.25 13.2135 11.25 12.5C11.25 11.7929 11.3677 11.1759 11.6031 10.6488C11.8385 10.1217 12.1713 9.71671 12.6018 9.43389C13.0389 9.14463 13.5466 9 14.125 9C14.7034 9 15.2077 9.14463 15.6382 9.43389C16.0753 9.71671 16.4116 10.1217 16.6469 10.6488C16.8823 11.1759 17 11.7929 17 12.5C17 13.2135 16.8823 13.8338 16.6469 14.3609C16.4116 14.8815 16.0753 15.2865 15.6382 15.5758C15.2077 15.8586 14.7034 16 14.125 16ZM14.125 14.6501C14.5151 14.6501 14.8211 14.4637 15.043 14.0909C15.2649 13.7117 15.3759 13.1814 15.3759 12.5C15.3759 11.8186 15.2649 11.2916 15.043 10.9187C14.8211 10.5395 14.5151 10.3499 14.125 10.3499C13.7349 10.3499 13.4289 10.5395 13.207 10.9187C12.9851 11.2916 12.8741 11.8186 12.8741 12.5C12.8741 13.1814 12.9851 13.7117 13.207 14.0909C13.4289 14.4637 13.7349 14.6501 14.125 14.6501ZM8.60395 15.8554V10.7163L7 11.1405V9.81956L10.1978 9.01929V15.8554H8.60395Z"
                                      fill="white"></path>
                            </svg>
                        </button>
                        <button className={"fastForward"} onClick={handleFastForward}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard"
                                 data-name="Forward10">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M6.4443 3.68532C8.36794 2.39998 10.6778 1.8214 12.9802 2.04817C14.8093 2.22833 16.5439 2.90793 18 4H16V6H20C20.5523 6 21 5.55228 21 5V1H19V2.2532C17.2948 1.02858 15.288 0.265799 13.1762 0.0578004C10.4133 -0.214321 7.64153 0.479973 5.33315 2.02238C3.02478 3.56479 1.32262 5.85989 0.516716 8.51661C-0.28919 11.1733 -0.148983 14.0273 0.913448 16.5922C1.97588 19.1572 3.8948 21.2744 6.34325 22.5831C8.79169 23.8918 11.6182 24.3111 14.3411 23.7694C17.064 23.2278 19.5149 21.7588 21.2761 19.6127C23.0374 17.4666 24 14.7763 24 12L22 12C22 14.3136 21.1978 16.5555 19.7301 18.3439C18.2624 20.1323 16.22 21.3565 13.9509 21.8079C11.6818 22.2592 9.32641 21.9098 7.28604 20.8192C5.24567 19.7286 3.64657 17.9643 2.76121 15.8269C1.87585 13.6894 1.75901 11.3111 2.4306 9.09717C3.10218 6.88324 4.52065 4.97066 6.4443 3.68532ZM22 4V7H19V9H23C23.5523 9 24 8.55228 24 8V4H22ZM12.6018 15.5758C13.0389 15.8586 13.5466 16 14.125 16C14.7034 16 15.2077 15.8586 15.6382 15.5758C16.0753 15.2865 16.4116 14.8815 16.6469 14.3609C16.8823 13.8338 17 13.2135 17 12.5C17 11.7929 16.8823 11.1758 16.6469 10.6488C16.4116 10.1217 16.0753 9.71671 15.6382 9.43388C15.2077 9.14463 14.7034 9 14.125 9C13.5466 9 13.0389 9.14463 12.6018 9.43388C12.1713 9.71671 11.8385 10.1217 11.6031 10.6488C11.3677 11.1758 11.25 11.7929 11.25 12.5C11.25 13.2135 11.3677 13.8338 11.6031 14.3609C11.8385 14.8815 12.1713 15.2865 12.6018 15.5758ZM15.043 14.0909C14.8211 14.4637 14.5151 14.6501 14.125 14.6501C13.7349 14.6501 13.4289 14.4637 13.207 14.0909C12.9851 13.7117 12.8741 13.1814 12.8741 12.5C12.8741 11.8186 12.9851 11.2916 13.207 10.9187C13.4289 10.5395 13.7349 10.3499 14.125 10.3499C14.5151 10.3499 14.8211 10.5395 15.043 10.9187C15.2649 11.2916 15.3759 11.8186 15.3759 12.5C15.3759 13.1814 15.2649 13.7117 15.043 14.0909ZM8.60395 10.7163V15.8554H10.1978V9.01928L7 9.81956V11.1405L8.60395 10.7163Z"
                                      fill="white"></path>
                            </svg>
                        </button>
                        <button className={"volume"} onClick={handleVolume}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="Hawkins-Icon Hawkins-Icon-Standard" data-name="VolumeHigh">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M24 12C24 8.28699 22.525 4.72603 19.8995 2.10052L18.4853 3.51474C20.7357 5.76517 22 8.81742 22 12C22 15.1826 20.7357 18.2349 18.4853 20.4853L19.8995 21.8995C22.525 19.274 24 15.7131 24 12ZM11 4.00001C11 3.59555 10.7564 3.23092 10.3827 3.07613C10.009 2.92135 9.57889 3.00691 9.29289 3.29291L4.58579 8.00001H1C0.447715 8.00001 0 8.44773 0 9.00001V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00001ZM5.70711 9.70712L9 6.41423V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70712ZM16.0001 12C16.0001 10.4087 15.368 8.8826 14.2428 7.75739L12.8285 9.1716C13.5787 9.92174 14.0001 10.9392 14.0001 12C14.0001 13.0609 13.5787 14.0783 12.8285 14.8285L14.2428 16.2427C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92896C18.9462 6.80432 19.9998 9.34786 19.9998 12C19.9998 14.6522 18.9462 17.1957 17.0709 19.0711L15.6567 17.6569C17.157 16.1566 17.9998 14.1218 17.9998 12C17.9998 9.87829 17.157 7.84346 15.6567 6.34317L17.0709 4.92896Z"
                                      fill="white"></path>
                            </svg>
                        </button>
                        <p className={"title"}>
                            <span className={"series"}>Blender Foundation</span>
                            <span className={"episodeName"}>Bick Buck Bunny</span>
                        </p>
                        <button className={"help"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        </button>
                        <button className={"next"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <polygon points="5 4 15 12 5 20 5 4"></polygon>
                                <line x1="19" y1="5" x2="19" y2="19"></line>
                            </svg>
                        </button>
                        <button className={"episode"}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard"
                                 data-name="Episodes">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M8 5H22V13H24V5C24 3.89543 23.1046 3 22 3H8V5ZM18 9H4V7H18C19.1046 7 20 7.89543 20 9V17H18V9ZM0 13C0 11.8954 0.895431 11 2 11H14C15.1046 11 16 11.8954 16 13V19C16 20.1046 15.1046 21 14 21H2C0.895431 21 0 20.1046 0 19V13ZM14 19V13H2V19H14Z"
                                      fill="white"></path>
                            </svg>
                        </button>
                        <button className={"subTitle"}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="Hawkins-Icon Hawkins-Icon-Standard" data-name="Subtitles">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M0 4C0 3.44772 0.447715 3 1 3H23C23.5523 3 24 3.44772 24 4V16C24 16.5523 23.5523 17 23 17H19V20C19 20.3688 18.797 20.7077 18.4719 20.8817C18.1467 21.0557 17.7522 21.0366 17.4453 20.8321L11.6972 17H1C0.447715 17 0 16.5523 0 16V4ZM2 5V15H12H12.3028L12.5547 15.1679L17 18.1315V16V15H18H22V5H2ZM10 9H4V7H10V9ZM20 11H14V13H20V11ZM12 13H4V11H12V13ZM20 7H12V9H20V7Z"
                                      fill="white"></path>
                            </svg>
                        </button>
                        <button className={"fullScreen"} onClick={handleFullScreen}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="Hawkins-Icon Hawkins-Icon-Standard" data-name="FullscreenEnter"
                                 data-uia="control-fullscreen-enter">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M0 5C0 3.89543 0.895431 3 2 3H9V5H2V9H0V5ZM22 5H15V3H22C23.1046 3 24 3.89543 24 5V9H22V5ZM2 15V19H9V21H2C0.895431 21 0 20.1046 0 19V15H2ZM22 19V15H24V19C24 20.1046 23.1046 21 22 21H15V19H22Z"
                                      fill="white"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Container>);
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

    .videoPlayer {
      display: flex;
      justify-content: center;
      align-items: center;
      //width: 100vw;
      //height: 100vh;
    }

    video {
      height: 100vh;
      width: 100vw;
      object-fit: cover;
      //display: flex;
      //align-items: center;
      //justify-content: center;
      //object-fit: cover;
      //margin-top: 75px;
    }
  }
`;

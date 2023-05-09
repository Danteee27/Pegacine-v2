import React, {useEffect, useRef, useState} from 'react'
import './SearchPage.css'
import Navbar from "../../components/navbar/Navbar";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleXmark, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import requests from "../../Requests";
import Row from "../../components/row/Row";
import axios, {axiosInstance3} from "../../axios";
import Card from "../../components/card/Card";
import {log} from "yarn/lib/cli";

let curIndex = 0;

function SearchPage() {

    // const trailer = 'https://media.istockphoto.com/id/857947444/vi/video/thu-nh%E1%BB%8F-%C4%91%E1%BA%A7u-b%E1%BA%BFp-trang-tr%C3%AD-%C4%91%C4%A9a-c%E1%BB%A7a-m%C3%ACnh-v%C3%A0-tr%C3%B4ng-r%E1%BA%A5t-h%E1%BA%A1nh-ph%C3%BAc.mp4?s=mp4-640x640-is&k=20&c=aiuYYFGW7o-MIb95Gr1MLRP8F0gc7WD3u5qEpe1sR4I=';
    const trailer = 'https://media.istockphoto.com/id/857947444/vi/video/thu-nh%E1%BB%8F-%C4%91%E1%BA%A7u-b%E1%BA%BFp-trang-tr%C3%AD-%C4%91%C4%A9a-c%E1%BB%A7a-m%C3%ACnh-v%C3%A0-tr%C3%B4ng-r%E1%BA%A5t-h%E1%BA%A1nh-ph%C3%BAc.mp4?s=mp4-640x640-is&k=20&c=aiuYYFGW7o-MIb95Gr1MLRP8F0gc7WD3u5qEpe1sR4I=';
    const base_url = "https://image.tmdb.org/t/p/original/";
    const [isScrolled, setIsScrolled] = useState(false);
    const [movies, setMovies] = useState([]);
    const [url, setUrl] = useState("");
    const [reRender, setReRender] = useState(false);
    const [isSortHover, setIsSortHover] = useState(false);

    const item1 = useRef();
    const item2 = useRef();
    const item3 = useRef();
    const showedItem = useRef();// type of sort in sort Box
    const searchData = useRef();

    // const arrUrl = [requests.fetchTrending, requests.fetchDocumentaries, requests.fetchHorrorMovies, requests.fetchActionMovies]

    useEffect(() => {
        async function fetchData() {
            const request = await axiosInstance3.get(`http://localhost:3000/api/movie/search?query=%20&sort=1&page=1&pageSize=10`)
            setMovies(request.data.data.items)
            console.log(request.data.data.items)
            return request
        }

        fetchData();
    }, []);

    function searchFilm() {
        const curUrl = `http://localhost:3000/api/movie/search?query=${searchData.current.value||""}&sort=1&page=1&pageSize=10`;
        async function fetchData() {
            const request = await axios.get(curUrl);
            setMovies(request.data.data.items);
            console.log(request.data.data.items)
            return request;
        }

        fetchData();
        // setReRender(prev=>!prev)
    }

    function handleDropDownClick() {
        setIsSortHover(prevState => !prevState)
    }

    function handleChooseDropDown1() {
        showedItem.current.textContent = item1.current?.textContent
    }

    function handleChooseDropDown2() {
        showedItem.current.textContent = item2.current?.textContent
    }

    function handleChooseDropDown3() {
        showedItem.current.textContent = item3.current?.textContent
    }

    return (
        <React.Fragment>
            <Navbar/>
            <div className={"searchPage"}>
                <div className={"searchContainer"}>
                    <input ref={searchData} className={"inputSearch"} placeholder={"search films here"}/>
                    <button onClick={searchFilm} className={"searchButton"}>
                        <FontAwesomeIcon color={"snow"} icon={faMagnifyingGlass} size={"2x"}/>
                    </button>
                    <div className={"searchType"}>
                        <div className={"titleSort"}> Sort By</div>
                        <div className={"dropDownContainer"}>
                            <div className={"dropDown"} onClick={handleDropDownClick}>
                                <div className={"showedItem"} ref={showedItem}>Year Released</div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                                     strokeLinejoin="round" className="feather feather-chevron-down">
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </div>
                            {isSortHover &&
                                <div className={"hoverDropDown"}>
                                    <div className={"hoverShowedItem"} ref={item1} onClick={handleChooseDropDown1}>Year
                                        Relased
                                    </div>
                                    <div className={"hoverShowedItem"} ref={item2} onClick={handleChooseDropDown2}>A-Z
                                    </div>
                                    <div className={"hoverShowedItem"} ref={item3} onClick={handleChooseDropDown3}>Z-A
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {/*<Row title={"Results"} fetchUrl={url} isLargeRow={false}/>*/}
                <div className="searchResult">
                    {movies.map((movie, index) => {
                        return (<Card
                            movieData={movie}
                            index={index}
                            key={movie.id}
                            isLiked={true}
                        />);
                    })
                    }
                </div>
            </div>
        </React.Fragment>

    )

}


export default SearchPage
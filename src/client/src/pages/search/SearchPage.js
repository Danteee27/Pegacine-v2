import React, {useEffect, useState} from 'react'
import './SearchPage.css'
import Navbar from "../../components/navbar/Navbar";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleXmark, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import requests from "../../Requests";
import Row from "../../components/row/Row";
import axios from "../../axios";

let curIndex = 0;

function SearchPage() {


    const [url, setUrl] = useState("");

    const arrUrl = [requests.fetchTrending, requests.fetchDocumentaries, requests.fetchHorrorMovies, requests.fetchActionMovies]

    // useEffect(() => {
    //     const curUrl = arrUrl[curIndex];
    //     curIndex = (curIndex + 1) % arrUrl.length;
    //     console.log("day la IN")
    //     console.log(curUrl)
    //     setUrl(curUrl)
    //
    // }, [url]);

    function searchFilm() {
        const curUrl = arrUrl[curIndex];
        curIndex = (curIndex + 1) % arrUrl.length;
        console.log("day la OUT")
        console.log(curUrl)
        setUrl(curUrl)
    }

    return (
        <React.Fragment>
            <Navbar/>
            <div className={"searchPage"}>
                <div className={"searchContainer"}>
                    <input className={"inputSearch"} placeholder={"search films here"}/>
                    <button onClick={searchFilm} className={"searchButton"}>
                        <FontAwesomeIcon color={"snow"} icon={faMagnifyingGlass} size={"2x"}/>
                    </button>
                </div>
                <Row title={"Results"} fetchUrl={url} isLargeRow={false}/>
            </div>
        </React.Fragment>

    )

}


export default SearchPage
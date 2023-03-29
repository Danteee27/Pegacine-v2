import React, {useEffect, useState} from 'react'
import './SearchPage.css'
import Navbar from "../../components/navbar/Navbar";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleXmark, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import requests from "../../Requests";
import Row from "../../components/row/Row";
import axios from "../../axios";

function SearchPage() {


    const [url, setUrl] = useState("");

    const arrUrl = [requests.fetchTrending,requests.fetchDocumentaries,requests.fetchHorrorMovies,requests.fetchActionMovies]

    useEffect(() => {
        async function fetchData() {
            return arrUrl[Math.floor(Math.random()*arrUrl.length)];
        }

        fetchData();
    }, [url]);
    function searchFilm(value) {
        useEffect(() => {
            async function fetchData() {
                return arrUrl[Math.floor(Math.random()*arrUrl.length)];
            }

            fetchData();
        }, [url]);
    }

    return (
        <React.Fragment>
            <Navbar/>
            <div className={"searchPage"}>
                <div className={"searchContainer"}>
                    <input className={"inputSearch"} placeholder={"search films here"}/>
                    <button onClick={searchFilm} className={"searchButton"}>
                        <FontAwesomeIcon color={"snow"} icon={faMagnifyingGlass} size={"2x"} />
                    </button>
                </div>
                <Row title={"Results"} fetchUrl={requests.fetchActionMovies} isLargeRow={false}/>
            </div>
        </React.Fragment>

    )

}


export default SearchPage
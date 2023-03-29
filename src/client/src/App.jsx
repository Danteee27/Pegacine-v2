import * as React from 'react';
import Navbar from './components/navbar/Navbar';
import Row from "./components/row/Row";
import requests from "./Requests";

export default function App() {
    // console.log(requests.fetchDocumentaries);
    return (
        <div>
            <Navbar/>
            <Row title={"Netflix Original movies"} fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
            <Row title={"Documentaries"} fetchUrl={requests.fetchDocumentaries} isLargeRow={false}/>

            <Row title={"Trendings"} fetchUrl={requests.fetchTrending} isLargeRow={false}/>
            <Row title={"Action movies"} fetchUrl={requests.fetchActionMovies} isLargeRow={false}/>
            <Row title={"Comedy movies"} fetchUrl={requests.fetchComedyMovies} isLargeRow={false}/>
            <Row title={"Horror movies"} fetchUrl={requests.fetchHorrorMovies} isLargeRow={false}/>
        </div>
    );
}

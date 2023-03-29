import React from 'react'
import requests from "../../Requests";
import Row from "../../components/row/Row";



function MyList() {


    return (
        <div className={"myList"}>
            {
                <Row title={"My List"} fetchUrl={requests.fetchNullTest} isLargeRow={false}/>
            }
        </div>
    )

}


export default MyList
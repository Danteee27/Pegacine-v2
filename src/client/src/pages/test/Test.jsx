import React, {useEffect, useState} from 'react'
import Navbar from "../../components/navbar/Navbar";
import './test.css'
function TestPage({testValue}) {
    const [job, setJob] = useState('');
    const [jobs, setJobs] = useState(["con ga", "con bo ", "con cuu"]);
    useEffect(() => {
            console.log("alo day la effect")
            return "a";
        }
    );

    console.log("url:",testValue)


    return (
        <div style={{padding: 32}}>
            <Navbar/>
            <h1>Hello world</h1>
            <h1>Helloo: {testValue}</h1>
            <h1>type: {typeof testValue}</h1>
            <input
                value={job}
                onChange={(e) => {
                    setJob(e.target.value)
                }}
            />
            <button onClick={() => console.log(job)}>toggle</button>
            {console.log("alo day la callback") || false}
        </div>
    )

}

export default TestPage
import React, {useEffect, useState} from 'react'
import Navbar from "../../components/navbar/Navbar";

function TestPage() {
    const [job, setJob] = useState('');
    const [jobs, setJobs] = useState(["con ga", "con bo ", "con cuu"]);
    useEffect(() => {
            console.log("alo day la effect")
            return "a";
        }
    );


    return (
        <div style={{padding: 32}}>
            <Navbar/>
            <h1>Hello world</h1>
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
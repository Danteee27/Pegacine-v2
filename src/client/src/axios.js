import axios from 'axios';

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3"
});

export const axiosInstance2 = axios.create({
    baseURL:"http://localhost:3000/api/"
});

export const axiosInstance3 = axios.create({
    baseURL:"",
    // headers:{
    //     'Access-Control-Allow-Origin':'http://localhost:3000',
    //     'Access-Control-Allow-Credentials':'true'
    // }

});


// export instance2;
export default instance;
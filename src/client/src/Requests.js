const API_KEY = "b0e07216c77335143ec18d1740d808a5"

const request = {
    fetchTrending:`/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals   :`/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchNullTest: `/discover/movie?api_key=${API_KEY}&with_genres=123412312231`,

}

export default request

//https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213
// trending/all/week?api_key=${API_KEY}&language=en-US
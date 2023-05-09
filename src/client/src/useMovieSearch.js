import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useMovieSearch(query, sortType, pageNumber, pageSize) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [movies, setMovies] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setMovies([])
    }, [query,sortType])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: 'http://localhost:3000/api/movie/search',
            params: { query: query,sort:sortType, page: pageNumber, pageSize:pageSize },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setMovies(prevMovies => {
                return [...prevMovies, ...res.data.data.items]
            })
            setHasMore(res.data.docs.length > 0)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [query,sortType, pageNumber])

    return { loading, error, movies, hasMore }
}
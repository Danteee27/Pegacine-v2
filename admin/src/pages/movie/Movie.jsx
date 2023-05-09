import { Link, Redirect, useLocation } from "react-router-dom";
import "./movie.css";
import { Publish } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MovieByIdContext } from "../../context/movieContext/MovieContext";
import { getMovieById } from "../../context/movieContext/apiCalls";

export default function Movie() {
  // const { movie, dispatch } = useContext(MovieByIdContext);
  const ref = useRef();

  const [ movie, setMovie ] = useState(null);
  const [ image, setImage ] = useState(null);
  const [ title, setTitle ] = useState(null);
  const [ movieId, setMovieId ] = useState(null);
  const [ genres, setGenres ] = useState(null);
  const [ releaseDate, setReleaseDate ] = useState(null);
  const [ trailer, setTrailer ] = useState(null);
  const [ video, setVideo ] = useState(null);

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");


  useEffect(() => {
    async function fetchData() {
      return await fetch("/movie/findById?id=" + splitLocation[2])
        .then((res) => res.json())
    }

    fetchData().then(data => {
      setMovie(data.data);
      setImage(data.data.image);
      setTitle(data.data.title);
      setMovieId(data.data.movie_id);
      setGenres(data.data.movie_genres.map(element => element.genre.genre_name).join(', '));
      setReleaseDate(data.data.release_date);
      setTrailer(data.data.trailer);
      setVideo(data.data.video);
    });
  }, []);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newMovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            {/* <img src={image} alt="" className="productInfoImg" /> */}
            <span className="productName">{title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Movie ID:</span>
              <span className="productInfoValue">{movieId}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genres:</span>
              <span className="productInfoValue">{genres}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Release Date:</span>
              <span className="productInfoValue">{releaseDate}</span>
            </div>
            {/* <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input type="text" placeholder={title} />
            <label>Release Date</label>
            <input  type="date" placeholder={releaseDate} />
            <label>Genres</label>
            <input type="text" placeholder={genres} />
            {/* <label>Limit</label>
            <input type="text" placeholder={movie.limit} /> */}
            <label>Trailer</label>
            <input type="file" placeholder={trailer} />
            <label>Video</label>
            <input type="file" placeholder={video} />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={image}
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button type="submit" className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
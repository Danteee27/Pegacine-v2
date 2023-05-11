import { Link, Redirect, useLocation } from "react-router-dom";
import "./movie.css";
import { Publish } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import LoadingButton from "@mui/lab/LoadingButton";
import { CreateOutlined } from "@material-ui/icons";

export default function Movie() {
  // const { movie, dispatch } = useContext(MovieByIdContext);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [uploaded, setUploaded] = useState(0);

  const [updateMovie, setUpdateMovie] = useState(null);
  const [ movie, setMovie ] = useState(null);
  const [ title, setTitle ] = useState(null);
  const [ movieId, setMovieId ] = useState(null);
  const [ genres, setGenres ] = useState(null);
  const [ overview, setOverview ] = useState(null);
  const [ budget, setBudget ] = useState(null);
  const [ homepage, setHomepage ] = useState(null);
  const [ popularity, setPopularity ] = useState(null);
  const [ revenue, setRevenue ] = useState(null);
  const [ runtime, setRuntime ] = useState(null);
  const [ tagline, setTagline ] = useState(null);
  const [ releaseDate, setReleaseDate ] = useState(null);

  const [ trailer, setTrailer ] = useState(null);
  const [ video, setVideo ] = useState(null);
  const [ image, setImage ] = useState(null);
  const [ backdrop, setBackdrop ] = useState(null);
  const [ poster, setPoster ] = useState(null);

  const [ newTrailer, setNewTrailer ] = useState(null);
  const [ newVideo, setNewVideo ] = useState(null);
  const [ newImage, setNewImage ] = useState(null);
  const [ newBackdrop, setNewBackdrop ] = useState(null);
  const [ newPoster, setNewPoster ] = useState(null);

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdateMovie({ ...movie, [e.target.name]: value });

    // if (value === 'seriesId') {
    //   const series = seriesList.find(e => e.seriesId === value);
    //   setMovie({ ...movie, 'seriesOrder': series.movies.length });
    // }
  };

  const upload = (items) => {
    setLoadingUpload(true);
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const metadata = {
        contentType: 'image/jpeg'
      };
      const storageRef = ref(storage, `/items/${fileName}`);
      // const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      const uploadTask = uploadBytesResumable(storageRef, item.file, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUpdateMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setLoadingUpload(true);
    upload([
      { file: newImage, label: "image" },
      { file: newBackdrop, label: "backdrop" },
      { file: newPoster, label: "poster" },
      { file: newTrailer, label: "trailer" },
      { file: newVideo, label: "video" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put("/movie/" + movieId, updateMovie);
    // genres.forEach(async element => {
    //   await axios.post('/movie_genres', { genre_id: element.value, movie_id: res.data.data.movie_id })
    // });
    history.push('/movies', { replace: true });
  };


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
      setBackdrop(data.data.backdrop);
      setPoster(data.data.poster);
      setOverview(data.data.overview);
      setBudget(data.data.budget);
      setHomepage(data.data.homepage);
      setPopularity(data.data.popularity);
      setRevenue(data.data.revenue);
      setRuntime(data.data.runtime);
      setTagline(data.data.tagline);
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
            <input type="text" placeholder={title} onChange={handleChange}/>
            <label>Overview</label>
            <input type="text" placeholder={overview} onChange={handleChange}/>
            <label>Release Date</label>
            <input  type="date" placeholder={releaseDate} onChange={handleChange}/>
            <label>Budget</label>
            <input type="text" placeholder={budget} onChange={handleChange}/>
            <label>Homepage</label>
            <input type="text" placeholder={homepage} onChange={handleChange}/>
            <label>Popularity</label>
            <input type="text" placeholder={popularity} onChange={handleChange}/>
            <label>Revenue</label>
            <input type="text" placeholder={revenue} onChange={handleChange}/>
            <label>Runtime</label>
            <input type="text" placeholder={runtime} onChange={handleChange}/>
            <label>Tagline</label>
            <input type="text" placeholder={tagline} onChange={handleChange}/>
          </div>
          <div className="productFormLeft">
            <label>Movie Status</label>
            <select name="movie_status" id="movie_status" onChange={handleChange}>
              <option value="Released">Released</option>
              <option value="Pre-production">Pre-production</option>
              <option value="In Production">In Production</option>
              <option value="Post-production">Post-production</option>
              <option value="Completed">Completed</option>
              <option value="Upcoming">Upcoming</option>
            </select>
            <label>Adult</label>
            <select name="isAdult" id="isAdult" onChange={handleChange}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
            <label>User Rank</label>
            <select name="userRank" id="userRank" onChange={handleChange}>
              <option value="SILVER">Silver</option>
              <option value="GOLD">Gold</option>
            </select>
            <label>Trailer</label>
            <input type="file" name="trailer" placeholder={trailer} onChange={(e) => setNewTrailer(e.target.files[0])}/>
            <label>Video</label>
            <input type="file" name="video" placeholder={video} onChange={(e) => setNewVideo(e.target.files[0])}/>
          </div>
          <div className="productFormRight">
            <div className="productUploadContainer">
              <div className="productUploadTitle">Image</div>
              <div className="productUpload">
                <img
                  src={image}
                  alt=""
                  className="productUploadImg"
                />
                {/* <label for="file">
                  <Publish />
                </label> */}
                <input type="file" id="image" name="image" onChange={(e) => setNewImage(e.target.files[0])}/>
              </div>
            </div>
            <div className="productUploadContainer">
              <div className="productUploadTitle">Backdrop</div>
              <div className="productUpload">
                <img
                  src={backdrop}
                  alt=""
                  className="productUploadImg"
                />
                {/* <label for="file">
                  <Publish />
                </label> */}
                <input type="file" id="backdrop" name="backdrop" onChange={(e) => setNewBackdrop(e.target.files[0])}/>
              </div>
            </div>
            <div className="productUploadContainer">
              <div className="productUploadTitle">Poster</div>
              <div className="productUpload">
                <img
                  src={poster}
                  alt=""
                  className="productUploadImg"
                />
                {/* <label for="file">
                  <Publish />
                </label> */}
                <input type="file" id="poster" name="poster" onChange={(e) => setNewPoster(e.target.files[0])}/>
              </div>
            </div>
            {uploaded === 5 ? (
                <LoadingButton
                style={{
                  height: "30px", 
                  marginTop: "10px",
                  padding: "7px 10px",
                  border: "none",
                  borderRadius: "10px",
                  backgroundColor: "darkblue",
                  color: "white",
                  fontWeight: "600",
                  cursor: "pointer",
                  alignSelf: "center",
                  marginRight: "300px",
                }}
                loading={loadingSubmit}
                disabled={loadingSubmit}
                loadingPosition="start"
                startIcon={<CreateOutlined />}
                variant="outlined"
                onClick={handleSubmit}
              >
                Update
              </LoadingButton>
            ) :
            (
              <LoadingButton
              style={{
                height: "30px", 
                marginTop: "10px",
                padding: "7px 10px",
                border: "none",
                borderRadius: "10px",
                backgroundColor: "darkblue",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
                alignSelf: "center",
                marginRight: "300px",
              }}
              loading={loadingUpload}
              disabled={loadingUpload}
              loadingPosition="start"
              startIcon={<CreateOutlined />}
              variant="outlined"
              onClick={handleUpload}
            >
              Upload
            </LoadingButton>
            )
          }
          </div>
        </form>
      </div>
    </div>
  );
}
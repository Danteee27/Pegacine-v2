import { useContext, useState, useEffect } from "react";
import "./newMovie.css";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import LoadingButton from "@mui/lab/LoadingButton";
import { CreateOutlined } from "@material-ui/icons";
import Select from 'react-select'
import { useHistory } from "react-router-dom";
import axios from "axios";


export default function NewMovie() {
  const [selected, setSelected] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [series, setSeries] = useState();

  const [movie, setMovie] = useState({
    vote_count: 0
  });
  const [img, setImg] = useState(null);
  const [backdrop, setBackdrop] = useState(null);
  const [poster, setPoster] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [genres, setGenres] = useState(null);
  const [genreItems, setGenreItems] = useState([]);

  let genreMapItems = [];

  useEffect(() => {
    async function fetchData() {
      return await fetch("/genre")
        .then((res) => res.json())
    }

    fetchData().then(data => {
      data.forEach(e => {
        genreMapItems.push({
          value: e.genre_id,
          label: e.genre_name
        })
      })
      setGenreItems(genreMapItems);
    });

    async function fetchSeriesList() {
      const res = await axios.get("/movie/series")
      setSeriesList(res.data);
    }

    fetchSeriesList();
  }, []);

  const { dispatch } = useContext(MovieContext);

  const history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });

    if (value === 'seriesId') {
      const series = seriesList.find(e => e.seriesId === value);
      setMovie({ ...movie, 'seriesOrder': series.movies.length });
    }
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
            setMovie((prev) => {
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
      { file: img, label: "image" },
      { file: backdrop, label: "backdrop" },
      { file: poster, label: "poster" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, genres, dispatch);
    history.push('/movies', { replace: true });
  };

  const handleSelectChange = (selectedOption) => {
    setGenres(selectedOption);
  }

  return (
    <div className="newProduct">
      <div className="new-movie-title">
        <h1 className="addProductTitle">New Movie</h1>
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
                Create
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
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Backdrop</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setBackdrop(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Poster</label>
          <input
            type="file"
            id="poster"
            name="poster"
            onChange={(e) => setPoster(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Overview</label>
          <input
            type="text"
            placeholder="Overview"
            name="overview"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Release date</label>
          <input
            type="date"
            placeholder="Release Date"
            name="release_date"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Budget</label>
          <input
            type="text"
            placeholder="Budget"
            name="budget"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Homepage</label>
          <input
            type="text"
            placeholder="Homepage"
            name="homepage"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Popularity</label>
          <input
            type="numeric"
            placeholder="Popularity"
            name="popularity"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Revenue</label>
          <input
            type="numeric"
            placeholder="Revenue"
            name="revenue"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Runtime</label>
          <input
            type="numeric"
            placeholder="Runtime"
            name="runtime"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Movie Status</label>
          <select name="movie_status" id="movie_status" onChange={handleChange}>
            <option value="Released">Released</option>
            <option value="Pre-production">Pre-production</option>
            <option value="In Production">In Production</option>
            <option value="Post-production">Post-production</option>
            <option value="Completed">Completed</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Tagline</label>
          <input
            type="text"
            placeholder="Tagline"
            name="tagline"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Series</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        {movie.isSeries === "true" ?
          <>
            <div className="addProductItem">
              <label>Series name</label>
              <select name="seriesId" id="seriesId" onChange={handleChange}>
                {seriesList.map(e => {
                  return <option value={e.seriesId}>{e.seriesName}</option>
                })}
              </select>
            </div>
            {/* <div className="addProductItem">
              <label>Series Order</label>
                <input
                  type="numeric"
                  placeholder="Series Order"
                  name="seriesOrder"
                  onChange={handleChange}
                />
            </div> */}
          </>
          : <>
          <div className="addProductItem">
            <label>Series name</label>
            <input
              type="numeric"
              placeholder="Series name"
              name="seriesId"
              onChange={handleChange}
              disabled={true}
            />
          </div>
          {/* <div className="addProductItem">
            <label>Series Order</label>
              <input
                type="numeric"
                placeholder="Series Order"
                name="seriesOrder"
                onChange={handleChange}
                disabled={true}
              />
          </div> */}
        </>
        }
        <div className="addProductItem">
          <label>Adult</label>
          <select name="isAdult" id="isAdult" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>User Rank</label>
          <select name="userRank" id="userRank" onChange={handleChange}>
            <option value="SILVER">Silver</option>
            <option value="GOLD">Gold</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Genres</label>
          <Select 
            name="genre" 
            id="genre" 
            options={genreItems} 
            isMulti={true}
            value={genres}
            onChange={handleSelectChange}/>
        </div>
      </form>
    </div>
  );
}
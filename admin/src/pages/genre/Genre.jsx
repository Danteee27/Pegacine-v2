import { Link, useLocation } from "react-router-dom";
import "./genre.css";
import { Publish } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Genre() {
  // const { movie, dispatch } = useContext(MovieByIdContext);

  const [ genre, setGenre ] = useState(null);
  const [ genreName, setGenreName ] = useState('');
  const [ genreId, setGenreId ] = useState();

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");


  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/genre/" + splitLocation[2])
      setGenre(res.data);
      setGenreId(res.data.genre_id);
      setGenreName(res.data.genre_name);
    }

    fetchData();
  }, []);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Genre</h1>
        <Link to="/newGenre">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Genre ID</label>
            <input type="text" placeholder={genreId} readOnly/>
            <label>Genre name</label>
            <input type="text" placeholder={genreName} />
          </div>
          <div className="productFormRight">
            <button type="submit" className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
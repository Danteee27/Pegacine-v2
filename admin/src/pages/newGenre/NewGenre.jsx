import { useState } from "react";
import "./newGenre.css";
import LoadingButton from "@mui/lab/LoadingButton";
import { CreateOutlined } from "@material-ui/icons";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function NewGenre() {
  const [genre,setGenre] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    setGenre({ ...genre, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.post("/genre/", genre);
    history.push('/genres');
  };

  return (
    <div className="newProduct">
      <div className="new-movie-title">
        <h1 className="addProductTitle">New Genre</h1>
         </div>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Genre name</label>
          <input
            type="text"
            placeholder="Genre name"
            name="genre_name"
            onChange={handleChange}
          />
        </div>
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
            loading={loading}
            disabled={loading}
            loadingPosition="start"
            startIcon={<CreateOutlined />}
            variant="outlined"
            onClick={handleSubmit}
            >
            Create
            </LoadingButton>
      </form>
    </div>
  );
}
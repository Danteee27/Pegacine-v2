import { Link, useLocation } from "react-router-dom";
import "./series.css";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Series() {


  const [ series, setSeries ] = useState(null);
  const [ seriesId, setSeriesId ] = useState();
  const [ seriesName, setSeriesName ] = useState();
  const [ seriesDescription, setSeriesDescription ] = useState();

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");


  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/movie/series/" + splitLocation[2])
      setSeries(res.data);
      setSeriesId(res.data.data.seriesId);
      setSeriesName(res.data.data.seriesName);
      setSeriesDescription(res.data.data.seriesDescription);
    }

    fetchData();
  }, []);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Series</h1>
        <Link to="/newSeries">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Series ID</label>
            <input type="text" placeholder={seriesId} readOnly disabled/>
            <label>Series name</label>
            <input  type="text" placeholder={seriesName} />
            <label>Series description</label>
            <input type="text" placeholder={seriesDescription} />
          </div>
          <div className="productFormRight">
            <button type="submit" className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
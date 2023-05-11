import "./seriesList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SeriesList() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const res = await axios.get("/movie/series");
        setSeries(res.data);
    }
    fetchData();
  }, []);

  // const handleDelete = (id) => {
  //   const fetchData = async () => {
  //     await axios.delete("/genre/" + id);
  //     setSeries(series.filter(e => e.seriesId !== id));
  //   }
  //   fetchData();
  // };

  const columns = [
    { field: "seriesId", headerName: "ID", width: 90 },
    {
      field: "seriesName",
      headerName: "Series name",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img className="productListImg" src={params.row.image} alt="" /> */}
            {params.row.seriesName}
          </div>
        );
      },
    },
    { field: "seriesDescription", headerName: "Series description", width: 400 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: '/series-detail/' + params.row.seriesId }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            {/* <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            /> */}
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div>
        <Link to={"/newSeries/"}>
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={series}
        disableSelectionOnClick
        columns={columns}
        pageSize={20}
        getRowId={r => r.seriesId}
        style={{marginRight: "20px"}}
      />
    </div>
  );
}

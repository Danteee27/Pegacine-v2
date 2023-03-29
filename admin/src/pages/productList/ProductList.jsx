import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";

export default function ProductList() {
  const { movies, dispatch } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img className="productListImg" src={params.row.img} alt="" /> */}
            {params.row.title}
          </div>
        );
      },
    },
    { field: "budget", headerName: "Budget", width: 180 },
    { field: "homepage", headerName: "Homepage", width: 180 },
    { field: "overview", headerName: "Overview", width: 180 },
    { field: "popularity", headerName: "Popularity", width: 180 },
    { field: "release_date", headerName: "Release Date", width: 180 },
    { field: "runtime", headerName: "Runtime", width: 180 },
    { field: "status", headerName: "Status", width: 180 },
    { field: "tagline", headerName: "Tagline", width: 180 },
    { field: "vote_average", headerName: "Vote Average", width: 180 },
    { field: "vote_count", headerName: "Vote Count", width: 180 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={r => r.id}
      />
    </div>
  );
}

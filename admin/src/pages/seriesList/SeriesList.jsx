import "./seriesList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";

export default function SeriesList() {
  const { movies, dispatch } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };

  const columns = [
    { field: "movie_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img className="productListImg" src={params.row.image} alt="" /> */}
            {params.row.title}
          </div>
        );
      },
    },
    // { field: "budget", headerName: "Budget", width: 180 },
    // { field: "homepage", headerName: "Homepage", width: 180 },
    // { field: "overview", headerName: "Overview", width: 180 },
    // { field: "popularity", headerName: "Popularity", width: 180 },
    { field: "release_date", headerName: "Release Date", width: 160 },
    // { field: "runtime", headerName: "Runtime", width: 180 },
    { field: "movie_status", headerName: "Status", width: 120 },
    // { field: "tagline", headerName: "Tagline", width: 180 },
    { field: "vote_average", headerName: "Vote Avg", width: 130 },
    { field: "vote_count", headerName: "Vote Count", width: 150 },
    // { 
    //   field: "isSeries",
    //   headerName: "Series", 
    //   width: 120,
    // },
    // { field: "seriesId", headerName: "Series ID", width: 130 },
    // { field: "seriesOrder", headerName: "Series Order", width: 150 },
    { field: "tagline", headerName: "Tagline", width: 400 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: '/series-detail/' + params.row.movie_id }}
            >
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
      <div>
        <Link to={"/newSeries/"}>
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={20}
        checkboxSelection
        getRowId={r => r.movie_id}
        style={{marginRight: "20px"}}
      />
    </div>
  );
}

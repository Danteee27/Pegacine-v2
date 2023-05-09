import "./genreList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function GenreList() {
    const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const res = await axios.get("/genre");
        setGenres(res.data);
    }
    fetchData();
  }, []);

  const handleDelete = (id) => {
    const fetchData = async () => {
      await axios.delete("/genre/" + id);
      setGenres(genres.filter(e => e.genre_id !== id));
    }
    fetchData();
  };

  const columns = [
    { field: "genre_id", headerName: "ID", width: 90 },
    {
      field: "genre_name",
      headerName: "Genre name",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.genre_name}
          </div>
        );
      },
    },
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: '/genre/' + params.row.genre_id }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.genre_id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div>
        <Link to={"/newGenre/"}>
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={genres}
        disableSelectionOnClick
        columns={columns}
        pageSize={20}
        getRowId={r => r.genre_id}
        style={{marginRight: "20px"}}
      />
    </div>
  );
}

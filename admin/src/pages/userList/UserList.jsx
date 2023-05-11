import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/user/get_all_users/")
      setUsers(res.data);
    }

    fetchData();
  }, []);

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "phoneNumber", headerName: "Phone", width: 200 },
    { field: "userRank", headerName: "User rank", width: 200 },
    { field: "updatedAt", headerName: "Last updated", width: 200 },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={20}
      />
    </div>
  );
}
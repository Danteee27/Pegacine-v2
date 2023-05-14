import "./transactionList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TransactionList() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/api/user/transaction");
      setSeries(res.data);
    };
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
    { field: "id", headerName: "ID", width: 90 },
    { field: "transaction_id", headerName: "Trans. Id", width: 200 },
    { field: "user_id", headerName: "User Id", width: 200 },
    { field: "transaction_type", headerName: "Type", width: 200 },
    { field: "transaction_amount", headerName: "Amount", width: 200 },
    { field: "transaction_date", headerName: "Date", width: 200 },
    { field: "transaction_status", headerName: "Status", width: 200 },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={series}
        disableSelectionOnClick
        columns={columns}
        pageSize={20}
        getRowId={(r) => r.id}
        style={{ marginRight: "20px" }}
      />
    </div>
  );
}

import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "_id", headerName: "Bill Id", width: 200 },
  { field: "mobileNumber", headerName: "Mobile number", width: 130 },
  {
    field: "total",
    headerName: "Total",
    width: 130,
    valueFormatter: ({ value }) => `Rs ${value}`,
  },
  {
    field: "biriyani",
    headerName: "Biriyani Count",
    width: 130,
  },
  {
    field: "chicken",
    headerName: "Chicken Count",
    width: 130,
  },
  {
    field: "createdAt",
    headerName: "Bill date",
    type: "date",
    width: 230,
  },
];

export default function Report() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/billing", {
      method: "GET",
      headers: { "Content-type": "application/json;charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        var results = [];
        json.forEach(function (element, index) {
          element.id = index + 1;

          element.biriyani =
            element.items[0] && element.items[0].count
              ? element.items[0].count
              : 0;

          element.chicken =
            element.items[1] && element.items[1].count
              ? element.items[1].count
              : 0;

          results.push(element);
        });
        console.log(results);
        setRows(results);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div style={{ height: 400, width: "80%" }} className="report">
      {loading && <div>Loading...</div>}
      {!loading && (
        <DataGrid id="_id" rows={rows} columns={columns} pageSize={5} />
      )}
    </div>
  );
}

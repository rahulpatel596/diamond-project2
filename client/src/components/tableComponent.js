import MaterialTable from "material-table";
import { AddBox, ArrowDownward } from "@material-ui/icons";
import { useState, useEffect } from "react";
const axios = require("axios");

function TableComponent2() {
  const [columns, setColumns] = useState([
    { title: "Company Name", field: "name" },
    { title: "Description", field: "desc" },
    { title: "Amount", field: "amount", type: "numeric" },
    { title: "Total Rough", field: "total_rough", type: "numeric" },
    { title: "Date Given", field: "date_given", type: "date" },
    { title: "Date Received", field: "date_received", type: "date" },
  ]);

  const [records, setRecords] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://my-diamond-react.uc.r.appspot.com/api/records/", {
        mode: "cors",
      })
      .then((res) => {
        setRecords(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setHasError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{}}>
      <MaterialTable
        title="Records"
        columns={columns}
        data={records}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setRecords([...records, newData]);
                axios({
                  method: "post",
                  url: "https://my-diamond-react.uc.r.appspot.com/api/records/",
                  mode: "cors",
                  data: {
                    name: newData.name,
                    amount: newData.amount,
                    date_given: new Date(newData.date_given),
                    date_received: new Date(newData.date_received),
                    total_rough: newData.total_rough,
                    desc: newData.desc,
                  },
                })
                  .then((res) => {
                    console.log("Success status", res.data.success);
                  })
                  .catch((err) => {
                    console.error(err);
                  });
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...records];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                axios({
                  method: "post",
                  url: `https://my-diamond-react.uc.r.appspot.com/api/records/update/${oldData._id}`,
                  mode: "cors",
                  data: {
                    name: newData.name,
                    amount: newData.amount,
                    date_given: new Date(newData.date_given),
                    date_received: new Date(newData.date_received),
                    total_rough: newData.total_rough,
                    desc: newData.desc,
                  },
                })
                  .then((res) => {
                    console.log("Success status", res.data.success);
                  })
                  .catch((err) => {
                    console.error(err);
                  });
                setRecords([...dataUpdate]);
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...records];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                axios
                  .delete(
                    `https://my-diamond-react.uc.r.appspot.com/api/records/${oldData._id}`,
                    { mode: "cors" }
                  )
                  .then((res) => {
                    console.log("Success status", res.data.success);
                  })
                  .catch((err) => console.error(err));
                setRecords([...dataDelete]);
                resolve();
              }, 1000);
            }),
        }}
        options={{
          rowStyle: {
            backgroundColor: "#EEE",
          },
        }}
      />
    </div>
  );
}

export default TableComponent2;

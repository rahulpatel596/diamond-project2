import Navbar from "./Navbar";
import MaterialTable from "material-table";
import { AddBox, ArrowDownward } from "@material-ui/icons";
import { useState, useEffect } from "react";
const axios = require("axios");

function NewLot(props) {
  const [columns, setColumns] = useState([
    { title: "Lot Number", field: "LotNumber" },
    { title: "Company Name", field: "CompanyName" },
    { title: "Additional Details", field: "AdditionalDetails" },
    { title: "Total Carats", field: "TotalCarat", type: "numeric" },
    { title: "Date Given", field: "DateGiven", type: "date" },
    { title: "Date Received", field: "DateReceived", type: "date" },
  ]);

  const [records, setRecords] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/v2/api/lot/`, {
        mode: "cors",
      })
      .then((res) => {
        console.log(res);
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
      <Navbar />
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
                  url: "http://localhost:8000/v2/api/lot/add",
                  mode: "cors",
                  data: {
                    CompanyName: newData.CompanyName,
                    TotalCarat: newData.TotalCarat,
                    DateGiven: new Date(newData.DateGiven),
                    DateReceived: new Date(newData.DateReceived),
                    LotNumber: newData.LotNumber,
                    AdditionalDetails: newData.AdditionalDetails,
                  },
                })
                  .then((res) => {
                    console.log("Success", res.data.success);
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
                  url: `http://localhost:8000/v2/api/lot/update/${oldData._id}`,
                  mode: "cors",
                  data: {
                    CompanyName: newData.CompanyName,
                    TotalCarat: newData.TotalCarat,
                    DateGiven: newData.DateGiven,
                    DateReceived: newData.DateReceived,
                    LotNumber: newData.LotNumber,
                    AdditionalDetails: newData.AdditionalDetails,
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
                    `http://localhost:8000/api/lot/delete/${oldData._id}`,
                    {
                      mode: "cors",
                    }
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
            backgroundColor: "#fff",

            fontWeight: "500",
          },
        }}
      />
    </div>
  );
}

export default NewLot;

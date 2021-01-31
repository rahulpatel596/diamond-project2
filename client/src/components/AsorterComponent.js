import MaterialTable from "material-table";
import { AddBox, ArrowDownward } from "@material-ui/icons";
import { useState, useEffect } from "react";
const axios = require("axios");

function AsorterComponent(props) {
  console.log(props);
  const [columns, setColumns] = useState([
    { title: "Asorter", field: "AsorterName" },
    { title: "Description", field: "AdditionalDetails" },
    { title: "Carats Given", field: "CaratGiven", type: "numeric" },
    { title: "Carats Received", field: "CaratReceived", type: "numeric" },
    { title: "Date Given", field: "DateGiven", type: "date" },
    { title: "Date Received", field: "DateReceived", type: "date" },
  ]);

  const [records, setRecords] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.currentLot._id == null) {
      let idFromUrl = window.location.pathname.split("/")[2];
      axios
        .get(`http://localhost:8000/v2/api/asorter/${idFromUrl}`, {
          mode: "cors",
        })
        .then((res) => {
          console.log(res);
          setRecords(res.data[0].Asorters);
          setLoading(false);
        })
        .catch((err) => {
          setHasError(true);
          setLoading(false);
        });
    } else {
      setRecords(props.currentLot.Asorters);
    }
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
                  url:
                    "http://localhost:8000/v2/api/asorter/add/${props.currentLot._id}",
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
                  url: `http://localhost:8000/v2/api/asorter/update/${props.currentLot._id}/${oldData._id}`,
                  mode: "cors",
                  data: {
                    AsorterName: newData.AsorterName,
                    CaratGiven: newData.CaratGiven,
                    DateGiven: newData.DateGiven,
                    DateReceived: newData.DateReceived,
                    CaratReceived: newData.CaratReceived,
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
                    `http://localhost:8000/api/asorter/delete/${props.currentLot._id}/${oldData._id}`,
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
            backgroundColor: "#EEE",
          },
        }}
      />
    </div>
  );
}

export default AsorterComponent;

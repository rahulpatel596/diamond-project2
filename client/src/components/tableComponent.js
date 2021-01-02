import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { useState, useEffect } from "react";
const axios = require("axios");

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function TableComponent() {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/records/", { mode: "cors" })
      .then((res) => {
        setRecords(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setHasError(true);
        setLoading(false);
      });
  }, []);
  let test;
  if (loading) {
    test = <h1>Loading...</h1>;
  } else {
    test = (
      <div>
        <TableContainer
          component={Paper}
          style={{
            width: "90vw",
            marginLeft: "5vw",
            border: "none",
            boxShadow: "none",
          }}
        >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow key={new Date()}>
                <TableCell align="center">Company name</TableCell>
                <TableCell align="center">Total rough</TableCell>
                <TableCell align="center">Date given</TableCell>
                <TableCell align="center">Date received</TableCell>
                <TableCell align="center">Decription</TableCell>
                <TableCell align="center">Amount/Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.index}>
                  <TableCell component="th" scope="row">
                    {record.name}
                  </TableCell>
                  <TableCell align="center">{record.total_rough}</TableCell>
                  <TableCell align="center">{record.date_given}</TableCell>
                  <TableCell align="center">{record.date_received}</TableCell>
                  <TableCell align="center">{record.desc}</TableCell>
                  <TableCell align="center">{record.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
  return <div className="App">{test}</div>;
}

export default TableComponent;

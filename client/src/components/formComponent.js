import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useState } from "react";
const axios = require("axios");
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function FormComponent() {
  const classes = useStyles();

  const [companyName, setCompanyName] = useState("");
  const [amount, setAmount] = useState(0);
  const [dateGiven, setDateGiven] = useState(new Date());
  const [dateReceived, setDateReceived] = useState(new Date());
  const [totalRough, setTotalRough] = useState(0);
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/api/records/",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      data: {
        name: companyName,
        amount: amount,
        date_given: dateGiven,
        date_received: dateReceived,
        total_rough: totalRough,
        desc: description,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleCompanyName = (e) => {
    setCompanyName(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleDateReceived = (e) => {
    setDateReceived(e.target.value);
  };
  const handleDateGiven = (e) => {
    setDateGiven(e.target.value);
  };
  const handleTotalRough = (e) => {
    setTotalRough(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div
      style={{
        width: "80vw",
        marginLeft: "10vw",
        marginTop: "5vh",
        border: "none",
        boxShadow: "none",
      }}
    >
      <form autoComplete="off" className={classes.root} onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            grid: "auto-flow dense",
          }}
        >
          <TextField
            required
            label="Company Name"
            variant="outlined"
            onChange={handleCompanyName}
          />
          <TextField
            label="Amount"
            type="number"
            variant="outlined"
            onChange={handleAmount}
          />
          <TextField
            label="Date received"
            type="Date"
            variant="outlined"
            onChange={handleDateReceived}
          />
          <TextField
            label="Date given"
            variant="outlined"
            onChange={handleDateGiven}
          />
          <TextField
            label="Total rough"
            type="number"
            variant="outlined"
            onChange={handleTotalRough}
          />
          <TextField
            label="Description"
            variant="outlined"
            onChange={handleDescription}
          />
        </div>
        <br></br>
        <Button
          variant="outlined"
          color="secondary"
          type="submit"
          style={{ width: "80vw" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default FormComponent;

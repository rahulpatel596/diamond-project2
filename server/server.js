const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const records = require("./routes/api/records");
const cors = require("cors");
const Record = require("./models/Record");
const app = express();
const mongodb = require("mongodb");
app.use(cors());

//Middleware bodyParser
app.use(bodyParser.json());

//Connecting MONGODB Atlas
const db = require("./config/keys").MONGODB_URI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MONGODB Connected");
  })
  .catch((err) => {
    console.error(err);
  });
app.get("/", (req, res) => {
  res.send("hello world");
  res.status(200);
  np;
  res.end();
});

app.get("/record", (req, res) => {
  Record.find({}).then((records) => {
    res.json(records);
  });
});

app.use("/api/records", records);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server started on ${port}`);
});

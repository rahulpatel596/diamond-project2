const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const records = require("./routes/api/v2/records");
const asorter = require("./routes/api/v2/asorter");
const cors = require("cors");
const RecordV2 = require("./models/RecordV2");
const app = express();
const mongodb = require("mongodb");
app.use(cors());

//Middleware bodyParser
app.use(bodyParser.json());

//Connecting MONGODB Atlas
const db = require("./config/keys").MONGODB_URI2;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MONGODB Connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/v2/", (req, res) => {
  res.send("hello world");
  res.status(200);
  res.end();
});

app.get("/v2/record", (req, res) => {
  RecordV2.find({}).then((records) => {
    res.json(records);
  });
});

app.use("/v2/api/records", records);
app.use("/v2/api/asorter", asorter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server started on ${port}`);
});

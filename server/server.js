const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const lot = require("./routes/api/v2/lot");
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

app.use("/v2/api/lot", lot);
app.use("/v2/api/asorter", asorter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server started on ${port}`);
});

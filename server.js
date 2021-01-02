const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const records = require("./routes/api/records");

const app = express();

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

app.use("/api/records", records);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on ${port}`);
});

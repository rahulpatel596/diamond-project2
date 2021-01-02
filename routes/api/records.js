const express = require("express");
const router = express.Router();
const Record = require("../../models/Record");

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods: GET, POST, PUT");
  next();
});

// @route GET '/api/records'
// @desc Getting all records
router.get("/", (req, res) => {
  Record.find({}).then((records) => {
    res.json(records);
  });
});

// @route POST '/api/records'
router.post("/", (req, res) => {
  const newRecord = new Record({
    name: req.body.name,
    amount: req.body.amount,
    date_received: req.body.date_received,
    date_given: req.body.date_given,
    total_rough: req.body.total_rough,
    timeStamp: req.body.timeStamp,
    desc: req.body.desc,
  });

  newRecord.save().then((record) => {
    res.json(record);
  });
});

// @route DELETE record by id
router.delete("/:id", (req, res) => {
  Record.findById(req.params.id).then((record) => {
    record
      .remove()
      .then(() => {
        res.json({ success: true });
      })
      .catch((err) => {
        res.status(404).json({ success: false });
      });
  });
});

module.exports = router;

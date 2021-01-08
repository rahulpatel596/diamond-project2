const express = require("express");
const router = express.Router();
const Record = require("../../models/Record");

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

// @route POST '/api/records/update/:id'
router.post("/update/:id", (req, res) => {
  Record.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        desc: req.body.desc,
        date_given: req.body.date_given,
        date_received: req.body.date_received,
        amount: req.body.amount,
        total_rough: req.body.total_rough,
      },
    },
    function (err, record) {
      if (err) {
        res.send(err);
      } else {
        res.json({ success: "Record updated!" });
      }
    }
  );
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

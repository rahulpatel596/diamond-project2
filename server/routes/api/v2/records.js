const express = require("express");
const router = express.Router();
const RecordV2 = require("../../../models/RecordV2");

// @route GET '/api/records'
// @desc Getting all records
router.get("/", (req, res) => {
  RecordV2.find({}).then((records) => {
    res.json(records);
  });
});

// @route POST '/api/records'
router.post("/", (req, res) => {
  const newRecordV2 = new RecordV2({
    CompanyName: req.body.CompanyName,
    LotNumber: req.body.LotNumber,
    TotalCarat: req.body.TotalCarat,
    DateReceived: req.body.DateReceived,
    DateGiven: req.body.DateGiven,
    AdditionalDetails: req.body.AdditionalDetails,
    Asorters: [],
  });

  newRecordV2.save().then((record) => {
    res.json(record);
  });
});

// @route POST '/api/records/update/:id'
router.post("/update/:id", (req, res) => {
  RecordV2.updateOne(
    { _id: req.params.id },
    {
      $set: {
        CompanyName: req.body.CompanyName,
        LotNumber: req.body.LotNumber,
        AdditionalDetails: req.body.AdditionalDetails,
        DateGiven: req.body.DateGiven,
        DateReceived: req.body.DateReceived,
        TotalCarat: req.body.TotalCarat,
        Asorters: [],
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
  RecordV2.findById(req.params.id).then((record) => {
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

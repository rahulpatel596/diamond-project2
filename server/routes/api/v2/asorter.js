const express = require("express");
const router = express.Router();
const RecordV2 = require("../../../models/RecordV2");

// @route GET '/v2/api/asorter/:lotId'
// @desc Getting all records
router.get("/:lotId", (req, res) => {
  RecordV2.find({ _id: req.params.lotId }, { Asorters: 1 })
    .then((asorters) => res.json(asorters))
    .catch((err) => console.error(err));
});

// @route POST '/v2/api/asorter/add/:lotId'
// @desc Add new asorter
router.post("/add/:lotId", (req, res) => {
  console.log(req.body);
  RecordV2.updateOne(
    { _id: req.params.lotId },
    {
      $push: {
        Asorters: {
          AsorterName: req.body.AsorterName,
          CaratGiven: req.body.CaratGiven,
          CaratReceived: req.body.CaratReceived,
          DateGiven: new Date(req.body.DateGiven),
          DateReceived: new Date(req.body.DateReceived),
          AdditionalDetails: req.body.AdditionalDetails,
        },
      },
    },
    function (err, record) {
      if (err) {
        res.send(err);
      } else {
        res.json({ success: "Record Added!" });
      }
    }
  );
});

// @route POST '/v2/api/asorter/update/:lotId/:asorterId'
// @desc To update a asorter information in specific Lot.
router.post("/update/:lotId/:asorterId", (req, res) => {
  console.log(req.body);
  RecordV2.updateOne(
    //Match criteria
    { _id: req.params.lotId, "Asorters._id": req.params.asorterId },
    //Update array element
    {
      $set: {
        "Asorters.$.AsorterName": req.body.AsorterName,
        "Asorters.$.CaratGiven": req.body.CaratGiven,
        "Asorters.$.CaratReceived": req.body.CaratReceived,
        "Asorters.$.DateGiven": new Date(req.body.DateGiven),
        "Asorters.$.DateReceived": new Date(req.body.DateReceived),
        "Asorters.$.AdditionalDetails": req.body.AdditionalDetails,
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

// @route DELETE '/v2/api/asorter/delete/:lotId/:asorterId'
//@desc Delete asorter
router.delete("/delete/:lotId/:asorterId", (req, res) => {
  RecordV2.updateOne(
    //Match criteria
    { _id: req.params.lotId },
    //Action
    {
      $pull: {
        Asorters: {
          _id: req.params.asorterId,
        },
      },
    },

    function (err, record) {
      if (err) {
        res.send(err);
      } else {
        res.json({ success: "Record deleted!" });
      }
    }
  );
});

module.exports = router;

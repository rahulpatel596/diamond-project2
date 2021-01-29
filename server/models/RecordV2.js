const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecordSchema = new Schema(
  {
    CompanyName: {
      type: String,
      required: false,
    },
    LotNumber: {
      type: String,
      required: true,
    },
    TotalCarat: {
      type: Number,
      required: true,
    },

    DateGiven: {
      type: Date,
      required: false,
    },
    DateReceived: {
      type: Date,
      required: false,
    },
    timeStamp: {
      type: Date,
      required: true,
      default: Date.now,
    },
    AdditionalDetails: {
      type: String,
      required: false,
    },
    Asorters: [
      {
        AsorterName: {
          type: String,
          required: true,
        },
        CaratGiven: {
          type: Number,
          required: true,
        },
        CaratReceived: {
          type: Number,
          required: false,
        },
        AdditionalDetails: {
          type: String,
          required: false,
        },
        DateGiven: {
          type: Date,
          required: false,
        },
        DateReceived: {
          type: Date,
          required: false,
        },
      },
    ],
  },
  { collection: "Lot-info", versionKey: false }
);

module.exports = RecordV2 = mongoose.model("record", RecordSchema);

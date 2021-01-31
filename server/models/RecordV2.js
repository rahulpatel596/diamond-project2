const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecordSchema = new Schema(
  {
    CompanyName: {
      type: String,
      required: false,
      default: "Not Provided",
    },
    LotNumber: {
      type: String,
      required: true,
      default: "Not Provided",
    },
    TotalCarat: {
      type: Number,
      required: true,
      default: 0,
    },

    DateGiven: {
      type: Date,
      required: false,
      default: Date.now,
    },
    DateReceived: {
      type: Date,
      required: false,
      default: Date.now,
    },
    timeStamp: {
      type: Date,
      required: true,
      default: Date.now,
    },
    AdditionalDetails: {
      type: String,
      required: false,
      default: "Not Provided",
    },
    Asorters: [
      {
        AsorterName: {
          type: String,
          required: true,
          default: "No Name provided",
        },
        CaratGiven: {
          type: Number,
          required: true,
          default: 0,
        },
        CaratReceived: {
          type: Number,
          required: false,
          default: 0,
        },
        AdditionalDetails: {
          type: String,
          required: false,
          default: "Not provided",
        },
        DateGiven: {
          type: Date,
          required: false,
          default: Date.now,
        },
        DateReceived: {
          type: Date,
          required: false,
          default: Date.now,
        },
      },
    ],
  },
  { collection: "Lot-info", versionKey: false }
);

module.exports = RecordV2 = mongoose.model("record", RecordSchema);

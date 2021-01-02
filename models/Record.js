const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecordSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: false,
    },
    total_rough: {
      type: Number,
      required: false,
    },
    date_given: {
      type: Date,
      required: false,
    },
    date_received: {
      type: Date,
      required: false,
    },
    timeStamp: {
      type: Date,
      required: true,
      default: Date.now,
    },
    desc: {
      type: String,
      required: false,
    },
  },
  { collection: "diamond-model", versionKey: false }
);

module.exports = Record = mongoose.model("record", RecordSchema);

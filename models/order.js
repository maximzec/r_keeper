const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      require: true,
      default: [],
    },
  ],
  readyStatus: {
    type: Boolean,
    default: false,
  },
  timeOrdered: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);

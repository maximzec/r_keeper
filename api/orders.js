const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");

const Order = require("../models/order");
const Item = require("../models/item");
const order = require("../models/order");

router.get("/", (req, res, next) => {
  /* TODO : some error during populating orders
    cast error
  */
  Order.find()
    .exec()
    .then((orders) => {
      const response = {
        orders: orders.map((order) => {
          return {
            _id: order._id,
            items: order.items,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch();
});

router.post("/", (req, res, next) => {
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    items: req.body.items,
  });

  order
    .save()
    .then((result) => {
      res.status(200).json({
        message: "POST to /orders",
        createdOrder: order,
      });
    })
    .catch((err) => console.log(err));
});

router.post("/:orderID/ready", (req, res, next) => {
  const orderID = req.params.orderID;
  Order.updateOne(
    { _id: orderID },
    {
      $set: { readyStatus: true },
    }
  )
    .exec()
    .then((doc) =>
      res.status(200).json({
        message: "Succefuly updated status",
      })
    )
    .catch((err) => res.status(400).json({ error: err }));
});

router.get("/:orderID", (req, res, next) => {
  order
    .findById(req.params.orderID)
    .populate("items", "_id name price")
    .exec()
    .then((order) => {
      const response = {
        _id: order._id,
        items: order.items,
      };
      res.status(200).json(response);
    })
    .catch();
});

module.exports = router;

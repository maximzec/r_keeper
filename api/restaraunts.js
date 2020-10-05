const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "GET to /rests",
  });
});

router.post("/", (req, res, next) => {
  const restraunt = {
    name: req.body.name,
    id: req.body.id,
  };
  res.status(200).json({
    message: "POST to /rests",
    restraunt: restraunt,
  });
});

router.get("/:restID", (req, res, next) => {
  const id = req.params.restID;
  if (id === "special") {
    res.status(200).json({
      message: "special id",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "SUCCEFULY PASSED ID1",
      id: id,
    });
  }
});

module.exports = router;

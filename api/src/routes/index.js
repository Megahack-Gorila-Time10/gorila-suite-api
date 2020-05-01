const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the Gorilla Suite backend 🦍");
});

module.exports = {
  router,
};

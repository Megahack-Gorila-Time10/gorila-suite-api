require("dotenv").config();
const { PORT } = process.env;

const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const { mongooseConnect } = require("./resources");
const { router } = require("./routes");

mongooseConnect();
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

app.listen(PORT || 5000, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use("/", router);

const mongoose = require("mongoose");
const { MONGO_CONNECT_SRT } = process.env;

const mongooseConnect = () => {
  mongoose
    .connect(MONGO_CONNECT_SRT, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((db) => {
      console.log(
        `Connected to mongo! Database name: "${db.connections[0].name}"`
      );
    })
    .catch((err) => {
      console.error("An error accured while trying to connect to DB", err);
    });
};

module.exports = {
  mongooseConnect,
};

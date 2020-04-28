const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  gorillaId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  profileTypeId: {
    type: Number,
  },
  responses: {
    version: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Questionnaire",
    },
    responses: {
      type: Array,
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };

const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionnaireSchema = new Schema({
  questions: {
    type: Schema.Types.Mixed,
  },
  version: {
    type: Number,
    required: true,
  },
});

const Questionnaire = mongoose.model("Questionnaire", questionnaireSchema);

module.exports = { Questionnaire };

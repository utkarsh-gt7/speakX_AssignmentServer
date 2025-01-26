const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },

  anagramType: { type: String, enum: ["SENTENCE", "WORD"], required: false },
  blocks: [
    {
      text: { type: String, required: true },
      showInOption: { type: Boolean, default: true },
      isAnswer: { type: Boolean, default: false }
    }
  ],

  options: [
    {
      text: { type: String, required: true },
      isCorrectAnswer: { type: Boolean, required: true }
    }
  ],

  solution: { type: String, required: false },

}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema, "speakX_questions");

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Store type (ANAGRAM, MCQ, etc.)
  title: { type: String, required: true }, // Store the question title

  // For Anagrams
  anagramType: { type: String, enum: ["SENTENCE", "WORD"], required: false }, // Only applicable for ANAGRAM type
  blocks: [
    {
      text: { type: String, required: true },  // Text of the block
      showInOption: { type: Boolean, default: true }, // Whether the block should show as an option
      isAnswer: { type: Boolean, default: false } // Whether this block is part of the correct answer
    }
  ],

  // For MCQs
  options: [
    {
      text: { type: String, required: true }, // Text of the option
      isCorrectAnswer: { type: Boolean, required: true } // Whether the option is the correct answer
    }
  ],

  // For Anagram or MCQ
  solution: { type: String, required: false }, // The correct solution/answer to the question

}, { timestamps: true }); // Adding timestamps for automatic createdAt and updatedAt fields

module.exports = mongoose.model("Question", questionSchema, "speakX_questions");

const Question = require("../models/question");

const getQuestionsByTitle = async (title) => {
  console.log("Executing DB query for title:", title); // Debug log
  return await Question.find({ title: { $regex: title, $options: "i" } });
};

const getQuestionsByType = async (type) => {
  console.log("Executing DB query for type:", type); // Debug log
  return await Question.find({ type });
};

module.exports = { getQuestionsByTitle, getQuestionsByType };

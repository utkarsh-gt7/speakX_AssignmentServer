const Question = require("../models/question");

const getPaginatedQuestionsByTitle = async (title, pageNumber = 1, pageSize = 10) => {
  const skip = (pageNumber - 1) * pageSize;
  const totalQuestions = await Question.countDocuments({ title: { $regex: title, $options: "i" } });
  const questions = await Question.find({ title: { $regex: title, $options: "i" } })
    .skip(skip)
    .limit(pageSize);
  return { questions, totalQuestions };
};

const getPaginatedQuestionsByType = async (type, pageNumber = 1, pageSize = 10) => {
  const skip = (pageNumber - 1) * pageSize;
  const totalQuestions = await Question.countDocuments({ type });
  const questions = await Question.find({ type })
    .skip(skip)
    .limit(pageSize);
  return { questions, totalQuestions };
};

module.exports = { getPaginatedQuestionsByTitle, getPaginatedQuestionsByType };

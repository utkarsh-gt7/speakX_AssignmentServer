const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const protoPath = path.resolve(__dirname, "../proto/question.proto");
const packageDefinition = protoLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const questionProto = grpc.loadPackageDefinition(packageDefinition).question;

const client = new questionProto.QuestionService("localhost:50051", grpc.credentials.createInsecure());

client.GetQuestionsByTitle({ title: "Rearrange" }, (err, response) => {
  if (err) {
    console.error("Error:", err.message);
  } else {
    console.log("Questions by Title:", response.questions.slice(0, 10));
  }
});

client.GetQuestionsByType({ type: "ANAGRAM" }, (err, response) => {
  if (err) {
    console.error("Error:", err.message);
  } else {
    const first10Questions = response.questions.slice(0, 10);
    console.log("First 10 Questions by Type:", first10Questions);
  }
});

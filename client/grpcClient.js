const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

// Load the proto file
const protoPath = path.resolve(__dirname, "../proto/question.proto");
const packageDefinition = protoLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const questionProto = grpc.loadPackageDefinition(packageDefinition).question;

// Create a gRPC client
const client = new questionProto.QuestionService("localhost:50051", grpc.credentials.createInsecure());

// Test GetQuestionsByTitle
client.GetQuestionsByTitle({ title: "Rearrange" }, (err, response) => {
  if (err) {
    console.error("Error:", err.message);
  } else {
    console.log("Questions by Title:", response.questions.slice(0, 10));
  }
});

// Test GetQuestionsByType
client.GetQuestionsByType({ type: "ANAGRAM" }, (err, response) => {
  if (err) {
    console.error("Error:", err.message);
  } else {
    // Only log the first 10 questions
    const first10Questions = response.questions.slice(0, 10);
    console.log("First 10 Questions by Type:", first10Questions);
  }
});

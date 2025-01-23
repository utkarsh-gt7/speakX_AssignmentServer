const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const { getPaginatedQuestionsByTitle, getPaginatedQuestionsByType } = require("../services/questionService");

// Load the .proto file
const protoPath = path.resolve(__dirname, "../proto/question.proto");
const packageDefinition = protoLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const questionProto = grpc.loadPackageDefinition(packageDefinition).question;

// Create the gRPC server
const server = new grpc.Server();

server.addService(questionProto.QuestionService.service, {
  GetQuestionsByTitle: async (call, callback) => {
    try {
      const { title, pageNumber, pageSize } = call.request;
      console.log("Title received in gRPC request:", title);

      const { questions, totalQuestions } = await getPaginatedQuestionsByTitle(title, pageNumber, pageSize);
      console.log("Paginated questions fetched by title:", questions);

      callback(null, { questions, totalQuestions });
    } catch (err) {
      console.error("Error in GetQuestionsByTitle:", err.message);
      callback({
        code: grpc.status.INTERNAL,
        message: err.message,
      });
    }
  },
  GetQuestionsByType: async (call, callback) => {
    try {
      const { type, pageNumber, pageSize } = call.request;
      console.log("Type received in gRPC request:", type);

      const { questions, totalQuestions } = await getPaginatedQuestionsByType(type, pageNumber, pageSize);
      console.log("Paginated questions fetched by type:", questions);

      callback(null, { questions, totalQuestions });
    } catch (err) {
      console.error("Error in GetQuestionsByType:", err.message);
      callback({
        code: grpc.status.INTERNAL,
        message: err.message,
      });
    }
  },
});

// Start the server
const start = () => {
  const PORT = 50051;
  server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error("Failed to start gRPC server:", err.message);
      return;
    }
    console.log(`gRPC server is running on port ${port}`);
    server.start();
  });
};

module.exports = { start };

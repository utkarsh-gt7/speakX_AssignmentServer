const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const { getQuestionsByTitle, getQuestionsByType } = require("../services/questionService");

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
      const title = call.request.title;
      console.log("Title received in gRPC request:", title); // Debug log
      const questions = await getQuestionsByTitle(title);
      console.log("Questions fetched by title:", questions); // Debug log
      callback(null, { questions });
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
      const type = call.request.type;
      console.log("Type received in gRPC request:", type); // Debug log
      const questions = await getQuestionsByType(type);
      console.log("Questions fetched by type:", questions); // Debug log
      callback(null, { questions });
    } catch (err) {
      console.error("Error in GetQuestionsByType:", err.message);
      callback({
        code: grpc.status.INTERNAL,
        message: err.message,
      });
    }
  },
});

// Export the server's start function
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

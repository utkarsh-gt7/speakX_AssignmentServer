const connectDB = require("./config/db");
const grpcServer = require("./grpc/server");
require("dotenv").config();

// Connect to MongoDB
connectDB();
console.log("Connected to MongoDB URI:", process.env.MONGO_URI);


// Start gRPC server
grpcServer.start();

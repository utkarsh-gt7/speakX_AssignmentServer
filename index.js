const connectDB = require("./config/db");
const grpcServer = require("./grpc/server");
require("dotenv").config();

connectDB();
console.log("Connected to MongoDB URI:", process.env.MONGO_URI);

grpcServer.start();

const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  if (isConnected) return mongoose.connection;

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, {
    autoIndex: true
  });

  isConnected = true;
  return mongoose.connection;
}

module.exports = connectDB;


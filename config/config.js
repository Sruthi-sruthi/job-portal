const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://sruthi:123@cluster0.984ve.mongodb.net/jobportal?retryWrites=true&w=majority"
  );
  console.log("db connectd");
}
module.exports = connectDB;

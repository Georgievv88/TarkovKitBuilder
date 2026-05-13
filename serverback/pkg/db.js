const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB);
    console.log("DB connected");
  } catch (error) {
    console.log("DB connection failed:", error.message);
  }
}
module.exports = connectDB;

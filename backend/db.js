const mongoose = require("mongoose");
const { connected } = require("process");

require("dotenv").config();

const connectToMongo = async () => {
  mongoose.connection.on("connected", () => {
    console.log("connected");
  }); //Checking the connection
  const data = await mongoose.connect(process.env.MONGO_URI); // Connectto mongo database
};

module.exports = connectToMongo;

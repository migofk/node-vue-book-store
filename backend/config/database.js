const mongoose = require("mongoose");

 // calling the url for .env file
const { MONGODB_URL } = process.env;

exports.connect = () => {
    // Connecting to the database
    mongoose
      .connect(MONGODB_URL)
      .then(() => {
        console.log("successfully connected to mongodb");
      })
      .catch((error) => {
        console.log("connection failed to mongodb");
        console.error(error);
      });
  };
const mongoose = require("mongoose");
const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "Connected to the database successfully!",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log("Connection to the database could not be made:", err);
  }
};

module.exports = connectDatabase;

const express = require("express");
const { errorHandler } = require("./middlewares/errorHandler");
const connectDatabase = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT;
connectDatabase();
app.use(express.json());
app.use("/users/", require("./Routes/taskRouter"));
app.use("/users/", require("./Routes/userRouter"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`connected to the port ${port}`);
});

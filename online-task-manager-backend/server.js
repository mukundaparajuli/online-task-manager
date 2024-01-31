const express = require("express");
const { errorHandler } = require("./middlewares/errorHandler");
const connectDatabase = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors")
const port = process.env.PORT;

connectDatabase();
app.use(cors())
app.use(express.json());
app.use("/users/", require("./Routes/taskRouter"));
app.use("/", require("./Routes/userRouter"));
// app.use("/", require("./RoutesprofileRouter"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`connected to the port ${port}`);
});

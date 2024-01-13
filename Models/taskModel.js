const mongoose = require("mongoose");

const taskSchmea = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    taskName: {
      type: String,
      required: [true, "Name of the task should be mentioned properly."],
    },
    taskDescription: {
      type: String,
    },
    startTime: {
      type: Date,
      required: [true, "Starting date con not be left blank!"],
    },
    endTime: {
      type: Date,
      required: [true, "Ending time for the task cannot be left blank!"],
    },
  },
  {
    timeStamp: true,
  }
);

module.exports = mongoose.model("Tasks", taskSchmea);

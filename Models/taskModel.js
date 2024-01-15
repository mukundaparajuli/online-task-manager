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
      required: [true, "Starting time con not be left blank!"],
      validate: {
        validator: function (value) {
          return value >= Date.now();
        },
        message: "Starting time should be in future!",
      },
    },
    endTime: {
      type: Date,
      required: [true, "Ending time for the task cannot be left blank!"],
      validate: {
        validator: function (value) {
          return value >= this.startTime;
        },
        message: "Ending time should be after the starting time!",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tasks", taskSchmea);

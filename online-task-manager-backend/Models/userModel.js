const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(value)
        },
        message: props => "Invalid Email Format!"
      }
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      min: [8, "Password should have minimum 8 letters"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    dateOfBirth: String,
    age: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);

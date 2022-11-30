const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
  name: String,
  email: String,
  password: String,
  year: Number,
  department: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

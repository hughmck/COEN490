const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  age: Number,
  joined: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model("user", UserSchema)

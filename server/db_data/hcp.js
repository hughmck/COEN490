const mongoose = require("mongoose")

const HCPSchema = new mongoose.Schema({
  name: String,
  age: Number,
  isAdult: Boolean,
  joined: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model("hcp", HCPSchema)

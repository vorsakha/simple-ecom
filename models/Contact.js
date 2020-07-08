const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  text: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Contact = mongoose.model("contact", ContactSchema);

const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  shipping: [
    {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Address = mongoose.model("address", AddressSchema);

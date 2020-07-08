const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  orders: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    },
  ],
});

module.exports = Cart = mongoose.model("cart", CartSchema);

const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  items: {
    name: {
      type: [String],
      required: true,
    },
    quantity: {
      type: [Number],
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },

  shipping: {
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

  payment: {
    paymentMethod: {
      type: String,
      required: true,
    },
  },

  taxPrice: {
    type: Number,
  },

  shippingPrice: {
    type: Number,
  },

  isPaid: {
    type: Boolean,
    default: false,
  },

  paidAt: {
    type: Date,
  },

  isDelivered: {
    type: Boolean,
    default: false,
  },

  deliveredAt: {
    type: Date,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);

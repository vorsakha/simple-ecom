const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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

    itemsPrice: {
      type: Number,
    },

    taxPrice: {
      type: Number,
    },

    shippingPrice: {
      type: Number,
    },

    totalPrice: {
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
  },
  {
    timestamps: true,
  }
);

module.exports = Order = mongoose.model("order", OrderSchema);

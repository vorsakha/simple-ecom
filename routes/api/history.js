const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const Order = require("../../models/Order");
const Product = require("../../models/Product");
const User = require("../../models/User");
const Cart = require("../../models/Cart");

// @route   GET api/history
// @desc    Get current user's all order history
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const orderHistory = await Order.findOne({
      user: req.user.id,
    });

    if (!orderHistory) {
      return res.status(400).json({ msg: "Order not found." });
    }

    res.json(orderHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   GET api/history/:id
// @desc    Get specific order in history
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      user: req.user.id,
      _id: req.params.id,
    });

    if (!order) {
      return res.status(400).json({ msg: "Order not found." });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   PATCH api/history/:id
// @desc    Edit order status (SUPER)
// @access  Private
router.patch("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.isAdmin)
      return res.status(401).json({ msg: "User not authorized." });

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(400).json({ msg: "Order not found." });
    }

    const update = {
      isPaid: req.body.isPaid,
      paidAt: req.body.paidAt,
      isDelivered: req.body.isDelivered,
      deliveredAt: req.body.deliveredAt,
    };

    const updateOrder = await Order.findOneAndUpdate(
      { _id: req.params.id },
      { $set: update },
      { new: true }
    );

    res.json(updateOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

module.exports = router;

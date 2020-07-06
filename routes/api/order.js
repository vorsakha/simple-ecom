const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");

const Order = require("../../models/Order");
const Product = require("../../models/Product");
const User = require("../../models/User");

// @route   GET api/order
// @desc    Get current user's all orders
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    });

    if (!orders) {
      return res.status(400).json({ msg: "Order not found." });
    }

    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   GET api/order/:id
// @desc    Get current user's specific order
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });

    if (!order) {
      return res.status(400).json({ msg: "Order not found." });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   DELETE api/order/:id
// @desc    Get current user's specific order
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });

    if (!order) {
      return res.status(400).json({ msg: "Order not found." });
    }

    const deletedOrder = await order.remove();

    res.json(deletedOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   POST api/order/:id
// @desc    Create user's orders by item id
// @access  Private
router.post(
  "/:id",
  [
    auth,
    // [
    //   check("orderItems", "Order items is required"),
    //   check("shipping", "Shipping data is required"),
    //   check("payment", "Payment data is required"),
    // ],
  ],
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    try {
      const product = await Product.findById(req.params.id);

      console.log(product);

      //   const newOrder = new Order({
      //     orderItems: req.body.orderItems,
      //     user: req.user._id,
      //     shipping: req.body.shipping,
      //     payment: req.body.payment,
      //     itemsPrice: req.body.itemsPrice,
      //     taxPrice: req.body.taxPrice,
      //     shippingPrice: req.body.shippingPrice,
      //     totalPrice: req.body.totalPrice,
      //   });

      //   await newOrder.save();

      //   res.json(newOrder);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

module.exports = router;

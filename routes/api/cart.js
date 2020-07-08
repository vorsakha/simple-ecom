const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");

const Order = require("../../models/Order");
const Product = require("../../models/Product");
const User = require("../../models/User");
const Cart = require("../../models/Cart");

// @route   PUT api/cart/:id
// @desc    Add product to cart
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const cart = await Cart.findOne({ user: req.user.id });

    if (!product) {
      return res.status(400).json({ msg: "There is no item with such id." });
    }

    if (product.countInStock === 0) {
      return res.status(404).json({ msg: "Out of stock." });
    }

    if (!cart) {
      return res
        .status(400)
        .json({ msg: "You have to login before adding to cart." });
    }

    const newAddToCart = {
      name: product.name,
      quantity: req.body.quantity,
      image: product.image,
      price: product.price * req.body.quantity,
      productId: product._id,
    };

    cart.orders.unshift(newAddToCart);

    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   GET api/cart
// @desc    Return current user's cart
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(400).json({ msg: "No cart found." });
    }

    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

module.exports = router;

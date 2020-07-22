const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");

const Order = require("../../models/Order");
const User = require("../../models/User");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

// @route   POST api/order/
// @desc    Order cart items
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("address", "Address is required.").not().isEmpty(),
      check("city", "City is required.").not().isEmpty(),
      //check("postalCode", "Postal Code is required.").isPostalCode("any"),
      check("country", "Country  is required.").not().isEmpty(),
      check("paymentMethod", "Payment Method is required.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const cart = await Cart.findOne({ user: req.user.id });

      const itemsName = [];
      const itemsQuantity = [];
      let itemsPrice = 0;

      const handleProduct = async (data) => {
        const product = await Product.findById(data.productId);

        if (product.countInStock < data.quantity) {
          throw "Stock not sufficient.";
        }

        product.countInStock = product.countInStock - data.quantity;

        await product.save();
      };

      cart.orders.map((data) => handleProduct(data));
      cart.orders.map((data) => itemsName.push(data.name));
      cart.orders.map((data) => itemsQuantity.push(data.quantity));
      cart.orders.map((data) => (itemsPrice = itemsPrice + Number(data.price)));

      const newOrder = {
        user: req.user.id,
        items: {
          name: itemsName,
          quantity: itemsQuantity,
          totalPrice: Number(itemsPrice.toFixed(2)),
        },
        shipping: {
          address: req.body.address,
          city: req.body.city,
          postalCode: req.body.postalCode,
          country: req.body.country,
        },
        payment: {
          paymentMethod: req.body.paymentMethod,
        },
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        isPaid: req.body.isPaid,
        paidAt: req.body.paidAt,
        isDelivered: req.body.isDelivered,
        deliveredAt: req.body.deliveredAt,
        status: req.body.status,
      };

      const order = new Order(newOrder);
      await order.save();

      // Clear cart
      do {
        cart.orders.pop();
      } while (cart.orders.length > 0);
      await cart.save();

      const orderHistory = await Order.find({
        user: req.user.id,
      });

      res.json(orderHistory);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

// @route   GET api/order
// @desc    Get all active orders (SUPER)
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user.isAdmin) {
      return res.status(401).json({ msg: "User not authorized." });
    }
    const orders = await Order.find();
    if (!orders) {
      return res.status(400).json({ msg: "No order found." });
    }
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   GET api/order/:id
// @desc    Get specific active order (SUPER)
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user.isAdmin) {
      return res.status(401).json({ msg: "User not authorized." });
    }

    const order = await Order.findById(req.params.id);

    if (!order) return res.status(400).json({ msg: "Order not found." });

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

module.exports = router;

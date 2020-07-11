const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");

const Product = require("../../models/Product");
const User = require("../../models/User");

// @route   GET api/products/all
// @desc    Get all products
// @access  Public
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/products/:id
// @desc    Get product by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found." });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(500).send("Server Error");
  }
});

// @route   PUT api/products/rate/:id
// @desc    Rate a product
// @access  Private
router.put(
  "/rate/:id",
  [auth, [check("comment", "Comment is required.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const product = await Product.findById(req.params.id);
      const user = await User.findById(req.user.id).select("-password");

      if (
        product.reviews.filter(
          (review) => review.user.toString() === req.user.id
        ).length > 0
      ) {
        return res.status(400).json({ msg: "Product already reviewed." });
      }

      const newReview = {
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
        rating: req.body.rating,
        comment: req.body.comment,
      };

      product.reviews.unshift(newReview);

      await product.save();

      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

// @route   PUT api/products/rate/:id/:rate_id
// @desc    Delete rating
// @access  Private
router.put("/rate/:id/:rate_id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    const rates = await product.reviews.filter(
      (rate) => rate._id.toString() === req.params.rate_id
    );

    if (rates.length === 0) {
      return res.status(400).json({ msg: "Rating does not exist" });
    }

    const removeIndex = product.reviews
      .map((rate) => rate.user.toString())
      .indexOf(req.user.id);

    product.reviews.splice(removeIndex, 1);

    await product.save();

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/products/:id
// @desc    Delete a product by id (SUPER)
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found." });
    }

    if (!user.isAdmin) {
      return res.status(401).json({ msg: "User not authorized." });
    }

    await product.remove();

    res.json({ msg: "Product removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found." });
    }
    res.status(500).send("Server error.");
  }
});

module.exports = router;

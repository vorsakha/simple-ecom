const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Product = require("../../models/Product");

// @route   POST api/upload
// @desc    Create a product
// @access  Private
router.post(
  "/",
  [
    auth,
    [check("name", "Item name is required").not().isEmpty()],
    [check("image", "Item image is required").not().isEmpty()],
    [check("brand", "Item brand is required").not().isEmpty()],
    [check("price", "Item price is required").not().isEmpty()],
    [check("category", "Item category is required").not().isEmpty()],
    [check("countInStock", "Item stock is required").not().isEmpty()],
    [check("description", "Item description is required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      if (user.isAdmin) {
        const newProduct = new Product({
          name: req.body.name,
          image: req.body.image,
          brand: req.body.brand,
          price: req.body.price,
          category: req.body.category,
          countInStock: req.body.countInStock,
          description: req.body.description,
          user: user.name,
        });

        const product = await newProduct.save();

        res.json(product);
      } else {
        return res.status(401).json({ msg: "User not authorized" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

// @route   PUT api/upload/:id
// @desc    Update a product
// @access  Private
router.put(
  "/:id",
  [
    auth,
    [check("name", "Product name is required").not().isEmpty()],
    [check("image", "Product image is required").not().isEmpty()],
    [check("brand", "Product brand is required").not().isEmpty()],
    [check("price", "Product price is required").not().isEmpty()],
    [check("category", "Product category is required").not().isEmpty()],
    [check("countInStock", "Product stock is required").not().isEmpty()],
    [check("description", "Product description is required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const product = await Product.findById(req.params.id);

      if (user.isAdmin && product) {
        (product.name = req.body.name),
          (product.image = req.body.image),
          (product.brand = req.body.brand),
          (product.price = req.body.price),
          (product.category = req.body.category),
          (product.countInStock = req.body.countInStock),
          (product.description = req.body.description),
          (product.user = user.name);

        const updatedProduct = await product.save();

        res.json(updatedProduct);
      } else {
        return res.status(401).json({ msg: "Error updating product." });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

module.exports = router;

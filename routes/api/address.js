const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");

const Address = require("../../models/Address");

// @route   POST api/address
// @desc    Add address
// @access  Private
router.put(
  "/",
  [
    auth,
    [
      check("address", "Address is required.").not().isEmpty(),
      check("city", "City is required.").not().isEmpty(),
      check("postalCode", "Input a valid Postal Code").isPostalCode("any"),
      check("country", "Country is required.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newAddress = {
      user: req.user.id,
      address: req.body.address,
      city: req.body.city,
      postalCode: req.body.postalCode,
      country: req.body.country,
    };

    try {
      const address = await Address.findOne({ user: req.user.id });

      address.shipping.unshift(newAddress);

      await address.save();

      res.json(address);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

// @route   GET api/address
// @desc    Get all addresses for this user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const address = await Address.findOne({
      user: req.user.id,
    });

    if (!address) {
      return res
        .status(400)
        .json({ msg: "There is no address form this user." });
    }

    res.json(address);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   GET api/address
// @desc    Get address by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const address = await Address.findOne({ user: req.user.id });

    const findAddress = address.shipping.filter(
      (data) => data._id.toString() === req.params.id
    );

    res.json(findAddress[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Contact = require("../../models/Contact");

// @route   GET api/contact
// @desc    Get all contact messages (SUPER)
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user.isAdmin) {
      return res.status(401).json({ msg: "User not authorized." });
    }

    const contact = await Contact.find().sort({ date: -1 });

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   GET api/contact/:id
// @desc    Get contact message by id (SUPER)
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user.isAdmin) {
      console.log(user.isAdmin);
      return res.status(401).json({ msg: "User not authorized." });
    }

    const contact = await Contact.findById(req.params.id);

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   POST api/contact
// @desc    Create contact message
// @access  Private
router.post(
  "/",
  [
    [
      check("text", "Text is required.").not().isEmpty(),
      check("name", "Name is required.").not().isEmpty(),
      check("subject", "Subject is required.").not().isEmpty(),
      check("email", "email", "Please include a valid email.").isEmail(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const message = {
      name: req.body.name,
      subject: req.body.subject,
      text: req.body.text,
      email: req.body.email,
    };

    try {
      const contact = new Contact(message);

      await contact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

// @route   DELETE api/contact/:id
// @desc    Delete contact message by id (SUPER)
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user.isAdmin) {
      return res.status(401).json({ msg: "User not authorized." });
    }

    const message = await Contact.findById(req.params.id);

    await message.remove();

    res.json({ msg: "Message removed." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

module.exports = router;

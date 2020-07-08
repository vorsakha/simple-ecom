const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/products", require("./routes/api/products"));
app.use("/api/upload", require("./routes/api/uploadProduct"));
app.use("/api/order", require("./routes/api/order"));
app.use("/api/cart", require("./routes/api/cart"));
app.use("/api/history", require("./routes/api/history"));
app.use("/api/contact", require("./routes/api/contact"));

app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));

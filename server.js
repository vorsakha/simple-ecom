const express = require("express");
//const connectDB

const app = express();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));

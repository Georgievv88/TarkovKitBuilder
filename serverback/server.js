const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./pkg/db");
const loadoutRoutes = require("./routes/loadoutRoutes");
const authRoutes = require("./routes/authRoutes");

connectDB();

const tarkovRoutes = require("./routes/tarkovRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tarkov", tarkovRoutes);
app.use("/api/loadouts", loadoutRoutes);

app.get("/", (req, res) => {
  res.send("The site is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

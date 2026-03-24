const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/route");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

app.use("/inventory", router);

app.use((err, req, res, next) => {
  console.log(`LOGGING ERROR:${err}`);

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server  Error",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is firing on port ${PORT}`);
  console.log(`🔗 Local URL: http://localhost:${PORT}`);
});

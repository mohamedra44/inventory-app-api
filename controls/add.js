const axios = require("axios");

module.exports = async (req,res,next) => {
  const { name, category, quantity, price } = req.body;

  const response = await axios.post(process.env.GOOGLE_SHEET_ID, {
    name,
    category,
    quantity,
    price,
    addedBy: req.user.username, // من التوكن
  });

  if (response.data.status === "success") {
    res.json({
      message: "The product has been successfully added to the sheet.",
    });
  } else {
    throw new Error("Failed to update the sheet");
  }
};

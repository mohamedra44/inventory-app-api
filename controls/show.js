const axios = require("axios");

module.exports = async (req, res, next) => {
  const response = await axios.get(process.env.GOOGLE_SHEET_ID);
  const products = response.data.map((row, index) => ({
    id: index + 1,
    name: row[0],
    category: row[1],
    quantity: row[2],
    price: row[3],
    addedBy: row[4],
    date: row[5],
  }));
  res.json(products);
};

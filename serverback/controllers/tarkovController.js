const axios = require("axios");

const searchItems = async (req, res) => {
  try {
    const search = req.query.search || "";

    const query = `
      query {
        itemsByName(name: "${search}") {
          id
          name
          shortName
          iconLink
          avg24hPrice
          lastLowPrice
          basePrice
          weight
          types
        }
      }
    `;

    const response = await axios.post(process.env.TARKOV_API, {
      query,
    });

    res.json(response.data.data.itemsByName);
  } catch (error) {
    console.log(error.message);
    res.status(500).json();
  }
};

module.exports = {
  searchItems,
};

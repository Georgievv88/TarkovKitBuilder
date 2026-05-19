const axios = require("axios");
const Fuse = require("fuse.js");

let cachedItems = null;

const searchItems = async (req, res) => {
  try {
    const search = req.query.search || "";

    if (!search.trim()) {
      return res.status(400).json({ message: "Search is required" });
    }

    if (!cachedItems) {
      const query = `
        query {
          items {
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

      cachedItems = response.data.data.items;
    }

    const fuse = new Fuse(cachedItems, {
      keys: ["name", "shortName", "types"],
      threshold: 0.35,
      ignoreLocation: true,
      includeScore: true,
    });

    const results = fuse.search(search).map((result) => result.item);

    res.json(results.slice(0, 30));
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to search items" });
  }
};

module.exports = {
  searchItems,
};

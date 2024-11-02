const express = require("express");
const {
  handleGenerateNewShortURL,
} = require("../controllers/url");

const router = express.Router();

// Define route for generating new short URL
router.post("/", handleGenerateNewShortURL);


module.exports = router;

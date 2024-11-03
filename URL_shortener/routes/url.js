const express = require("express");
const {
  handleGenerateNewShortURL,
  handleVisitClicks,
  handleRedirectURL,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/analytics/:shortId", handleVisitClicks);
router.get("/:shortId", handleRedirectURL);


module.exports = router;

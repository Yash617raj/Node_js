const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) { // Use to generate new shortURL
  const body = req.body; // take URL from the body
  if (!body.url) return res.status(400).json({ error: "url is required" }); // if URL exist or not
  
  const shortID = shortid(); // generate a unique shortId for the shortURL
  await URL.create({ // Save the new URL with its short ID and empty visit history in the database
    shortId: shortID,
    redirectURL: body.url,
    visitedHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home",{
    id: shortID,
  }) 
}

async function handleRedirectURL(req, res) {
  const shortId = req.params.shortId; // taking shortID from the URL
  const entry = await URL.findOneAndUpdate( // Find the entry by short ID and update the visit history with a new timestamp
    { shortId },
    {
      $push: {
        visitedHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  // Redirect the user to the original URL
  res.redirect(entry.redirectURL);
}

async function handleVisitClicks(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId }); // find the URL entry 

  // Return the total number of clicks and the visit history to the client
  return res.json({
    TotalClicks: result.visitedHistory.length,
    analytics: result.visitedHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleVisitClicks,
  handleRedirectURL,
};

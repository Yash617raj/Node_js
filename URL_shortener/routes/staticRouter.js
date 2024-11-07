const express = require("express");
const URL = require("../models/url");
const { checkAuth } = require("../middleware/auth");
const Router = express.Router();

Router.get("/", checkAuth, async (req, res) => {
  if (!req.user) return res.redirect("/");
  const allUrls = await URL.find({ createdBy: req.user._id });
  res.render("home", {
    Urls: allUrls,
  });
});

Router.get("/signup",(req,res)=>{
    res.render("signup")
})
Router.get("/login",(req,res)=>{
    res.render("login")
})

module.exports = Router;
const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middleware/auth");
// const { checkAuth } = require("../middleware/auth");
const Router = express.Router();

Router.get("/admin/url",restrictTo(["ADMIN"]),async(req,res)=>{
  const allUrls = await URL.find({});
  res.render("home", {
    Urls: allUrls,
  });
})

Router.get("/", restrictTo(["NORMAL","ADMIN"]),async (req, res) => {
  // if (!req.user) return res.redirect("/");
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
const express = require("express");
const URL = require("../models/url");
const Router = express.Router();

Router.get("/",async(req,res)=>{
    const allUrls = URL.find({});
    res.render("home",{
        Urls: allUrls
    });
})

module.exports = Router;
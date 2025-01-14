const { Router } = require("express");
const User = require("../models/user")

const router = Router();

router.get("/signin",(req,res)=>{
    res.render("signin")
})

router.get("/signup",(req,res)=>{
    res.render("signup")
})

router.post("/signup",async(req,res)=>{
    const {fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    })
    res.redirect('/')
})

module.exports = router
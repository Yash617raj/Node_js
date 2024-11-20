const express = require("express")
const env = require("dotenv")
const path = require("path")
const app = express();

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.get("/",(req,res)=>{
    res.render("home");
})

app.listen(5000,()=>console.log("Port is successfully connected"));
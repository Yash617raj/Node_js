const express = require("express")
const env = require("dotenv")
const path = require("path")
const app = express();
const userRouter = require("./routes/user");
const connectMongoDb = require("./connnection");

connectMongoDb("mongodb://127.0.0.1:27017/bloggin")

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.urlencoded({extended: false}))

app.get("/",(req,res)=>{
    res.render("home");
})

app.use("/user",userRouter);



app.listen(5000,()=>console.log("Port is successfully connected at 5000"));
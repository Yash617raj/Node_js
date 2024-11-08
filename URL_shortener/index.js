const express = require("express");
const cookieParser = require("cookie-parser");

const urlRoute = require("./routes/url");
const path = require("path");
const connectMongo = require("./connect");
const URL = require("./models/url");
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")
// const { isLoggedIn, checkAuth } = require("./middleware/auth");
const { checkAuthorization, restrictTo } = require("./middleware/auth");



const app = express(); // Initialize Express app
const PORT = 5001; // Define the port the server will listen on

// Connect to MongoDB and log a message if successful
connectMongo("mongodb://127.0.0.1:27017/url").then(() =>
  console.log("MongoDB connected")
);

app.set("view engine", "ejs"); // Tell express which template is to be used
app.set("views", path.resolve("./views")); // Define the path to the views folder

app.use(express.json()); // middleware to parse JSON data
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkAuthorization);

app.use("/url",restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.listen(PORT, () => console.log(`Server is connected to ${PORT}`));

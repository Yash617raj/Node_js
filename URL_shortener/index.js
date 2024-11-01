const express = require('express');
const urlRoute = require("./routes/url")
const connectMongo  = require("./connect");

const app = express();
const PORT = 5001;

connectMongo("mongodb://localhost:27017/URL_shortener").then(()=> console.log("mongoDB is connected"));

app.use('/url',urlRoute);

app.listen(PORT,()=>console.log(`server connected at PORT ${PORT}`));
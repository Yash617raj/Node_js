const express = require("express");
const userRouter = require("./routes/user") 
const {logReqRes} = require('./middleware');
const { connectMongoDb } = require("./connection");

const app = express();

// connection
connectMongoDb("mongodb://127.0.0.1:27017/test").then(()=>console.log("MongoDb connected!"));

//MiddleWare
app.use(express.urlencoded({ extended: true })); 
app.use(logReqRes("log.txt"))

// Routes
app.use('/api/users',userRouter);


const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server pata nhi kese par kaam kaar raha hai ${PORT} pe`)
); // Start the server on specified port

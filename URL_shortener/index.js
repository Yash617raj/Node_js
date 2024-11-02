const express = require("express");
const urlRoute = require("./routes/url")
const connectMongo = require("./connect");
const URL = require("./models/url");

const app = express();
const PORT = 5001;
connectMongo('mongodb://127.0.0.1:27017/url').then(()=>console.log("MongoDB connected"));

app.use(express.json());
app.use('/url',urlRoute)

app.get('/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitedHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectURL);
  }
)

app.listen(PORT,()=>console.log(`Server is connect to ${PORT}`));
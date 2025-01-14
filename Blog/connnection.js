const mongoose = require("mongoose");

function connectMongoDb(url){
    mongoose.connect(url).then(()=>console.log("MongoDb successfully connected"));
}

module.exports = connectMongoDb;
const fs = require("fs");

fs.writeFileSync("text.txt","Hello world");

fs.writeFile("text.txt","Hello world from the async",(err)=>{})

console.log(fs.readFileSync("text.txt","utf-8"));

fs.readFile("text.txt","utf-8",(err,res)=>{
    if(err) console.log("found an error")
    else console.log(res);
})

fs.appendFileSync("text.txt","Hey\n");

fs.cpSync("text.txt","copy.txt");

fs.unlinkSync("copy.txt");

console.log(fs.statSync("text.txt"));


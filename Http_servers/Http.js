const http = require("http")
const fs = require("fs")
const url = require("url")

const myServer = http.createServer((req,res)=>{
    if (req.url == "/favicon.ico") return res.end();
    const log = `${Date.now()} ${req.url} ${req.method} req received\n`
    const myUrl = url.parse(req.url,true);
    fs.appendFile(`text.txt`,log,(err,data)=>{
        switch(myUrl.pathname){
            case '/':
                if(req.method=="GET")res.end("GET method is used")
                break;
            case '/about':
                const name = myUrl.query.myname;
                const age = myUrl.query.my_age;
                const fav = myUrl.query.fav;
                res.end(`my name is ${name}, with age of ${age}. my favrouite thing is ${fav}`)
                break;
            case '/signup':
                if(req.method=="GET") res.end("You have opened a signup page")
                else{
                    // first db query will be given
                    res.end("You have opened the post method")
                }
            default:
                res.end("404 Not Found")
        }
    })
    
})

myServer.listen(5000,()=>console.log("Server is working"));
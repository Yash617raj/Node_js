const express = require('express')
const user = require("./MOCK_DATA.json")

const app = express()

app.use(express.urlencoded({extended: true})) // it takes the value from frontend and first convert it into object and then send to the req.body

app.use((req,res,next)=>{
  console.log("Hello from middleware 1"); // so this is basically holding the data as it is neither ending the data nor transfarring it
  // return res.json({msg: "Hello from middleware"}); // if we use this then the request is directly denied and this message is shown to the user
  next(); // this is used to pass the control to the next middleware
})

app.get("/user",(req,res)=>{
    const html =`
    <ul>
        ${user.map((users)=>`<li>${users.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html);
})


// app.get("/api/users/:id",(req,res)=>{
//   const id = Number(req.params.id); // we use Number because by default it is in string value (params: holds any route parameters)
//   const users = user.find((user) => user.id === id); // it checks if the id you are seraching for is in the user array
//   res.json(users);
// })

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id); // we use Number because by default it is in string value (params: holds any route parameters)
    const users = user.find((user) => user.id === id); // it checks if the id you are seraching for is in the user array
    res.json(users);
  })
  .patch((req, res) => {
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    return res.json({ status: "Pending" });
  })

app.post("/api/users", (req, res) => {
    const body = req.body
    console.log(body);
  res.send({ status: "pending" });
});

const PORT = 5000
app.listen(PORT,()=>console.log(`Server pata nhi kese par kaam kaar raha hai ${PORT} pe`))
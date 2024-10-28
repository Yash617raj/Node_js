const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs"); // Importing the 'fs' module to handle file operations

const app = express();

// connection
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("MongoDB successfully connected ho gaya"))
  .catch((err) => console.log("Found Error", err));

// schema
const userSchema = mongoose.Schema({ // this provides the format in which the data is sent to the database
  firstName: {
    type: String,
    required: true, // if this is given you can't move forward without finish this
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true, // if this is given then you can use the same input only once
  },
  gender: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
},
    {timestamps: true}// It shows when the new data is created
);

const User = mongoose.model("user", userSchema); // we have made an model on which we interact

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data; converts data from frontend into an object for req.body

app.use((req, res, next) => {
  // console.log("Hello from middleware 1"); // Logs a message from middleware; can intercept requests before passing control
  // return res.json({msg: "Hello from middleware"}); // Sends a response directly, stopping further request processing
  next(); // Passes control to the next middleware
});

app.get("/api/users", async(req, res) => {
  const dbUser = await User.find({})
  res.send(dbUser);
});

app.get("/user", async(req, res) => {
  const dbUser = await User.find({})
  const html = `
    <ul>
        ${dbUser
          .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
          .join("")} 
    </ul>
    `;
  res.send(html); // Sends the generated HTML list as the response
});

// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id); // Convert 'id' from string to number for comparison
//   const user = users.find((user) => user.id === id); // Finds user in array with matching ID
//   res.json(user); // Responds with the found user as JSON
// })

app.use("/api/users", (req, res, next) => {
  // res.setHeader("myName", "Yash raj"); // Sets a custom header
  // console.log(req.headers); // Logs request headers for inspection
  next();
});

app
  .route("/api/users/:id")
  .get(async(req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: "user not found" });
    res.json(user); // Sends the found user as JSON
  })
  .patch(async(req, res) => {
    await User.findByIdAndUpdate(req.params.id,{lastName: "Change"})
    return res.json({ status: "Success" }); // Placeholder for PATCH request; updates a user
  })
  .delete(async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "success" }); // Placeholder for DELETE request; deletes a user
  });

app.post("/api/users", async(req, res) => {
  const body = req.body; // Accessing data sent in the POST request body
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "all fields are required" }); // this status is send when the data is not correct data is not present (bad request)
  }
  
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title
  })
  res.status(201).json({msg: "successfully Created new field"});
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server pata nhi kese par kaam kaar raha hai ${PORT} pe`)
); // Start the server on specified port

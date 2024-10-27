const express = require("express");
const fs = require("fs"); // Importing the 'fs' module to handle file operations
const users = require("./MOCK_DATA.json"); // Importing mock data from a JSON file

const app = express();

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data; converts data from frontend into an object for req.body

app.use((req, res, next) => {
  // console.log("Hello from middleware 1"); // Logs a message from middleware; can intercept requests before passing control
  // return res.json({msg: "Hello from middleware"}); // Sends a response directly, stopping further request processing
  next(); // Passes control to the next middleware
});

app.get("/user", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")} 
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
  .get((req, res) => {
    const id = Number(req.params.id); // Convert 'id' from string to number
    const user = users.find((user) => user.id === id); // Finds user by ID in the users array
    res.json(user); // Sends the found user as JSON
  })
  .patch((req, res) => {
    return res.json({ status: "Pending" }); // Placeholder for PATCH request; updates a user
  })
  .delete((req, res) => {
    return res.json({ status: "Pending" }); // Placeholder for DELETE request; deletes a user
  });

app.post("/api/users", (req, res) => {
  const body = req.body; // Accessing data sent in the POST request body
  users.push({ ...body, id: users.length + 1 }); // Adds a new user with a unique ID
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err)
      return res.status(500).json({ status: "error", message: err.message }); // Sends error response if write fails
    res.status(201).json({ status: "success", id: users.length }); // Sends success response with the new user ID
  });
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server pata nhi kese par kaam kaar raha hai ${PORT} pe`)
); // Start the server on specified port

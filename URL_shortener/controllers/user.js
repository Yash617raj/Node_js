const User = require("../models/user"); 
const { v4: uuidv4 } = require("uuid"); 
const { setUser } = require("../service/auth"); 

// Handles user signup process
async function handleSignUp(req, res) {
  const { name, email, password } = req.body; // Extracting name, email, and password from the request body

  // Creating a new user in the database with the provided details
  await User.create({
    name,
    email,
    password,
  });

  // Redirecting the user to the home page after successful signup
  return res.redirect("/");
}

// Handles user login process
async function handleLogin(req, res) {
  const { email, password } = req.body; // Extracting email and password from the request body

  // Searching for a user in the database with the provided email and password
  const user = await User.findOne({ email, password });

  // If user is not found, render the login page with an error message
  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }

  // Generating a unique session ID and storing it in the session management system
  const sessionId = uuidv4();
  setUser(sessionId, user);

  // Setting a cookie named "uid" with the session ID for identifying the user session
  res.cookie("uid", sessionId);

  // Redirecting the user to the home page after successful login
  return res.redirect("/");
}

module.exports = {
  handleSignUp,
  handleLogin,
};

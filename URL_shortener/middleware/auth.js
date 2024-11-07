const {getUser} = require("../service/auth")

async function isLoggedIn(req,res,next){
  const userId = req.cookies?.uid; // this is checking if there exist any cookie of name uid
  if (!userId) return res.redirect("/login"); // if there is no cookie with uid then redirect to login
  const user = getUser(userId); // this check is the jwt token is correct or not
  if (!user) return res.redirect("/login"); // if false it will redirect to login

  req.user = user; // Attach the user data to the `req` object for access in subsequent middleware or routes
  next();
}

async function checkAuth(req,res,next){
    const userId = req.cookies?.uid;
    if (!userId) return res.redirect("/login");
    const user = await getUser(userId);

    // const userId = req.headers["authorization"]; // retreive the authorization header from the request
    // const token = userId.split("Bearer ")[1]; // this will extract the token from the authorization 
    // const user = getUser(token); // validate the token

    req.user = user;
    next();
}

module.exports = {
  isLoggedIn,
  checkAuth,
};
// const sessionIdToUserMap = new Map(); // Map to store user sessions

const jwt = require("jsonwebtoken"); 
const secret = "yash$raj$123" // this is a secret that is available the with dev only so that nobody else could change the data without this

// function setUser(id,user){
//     sessionIdToUserMap.set(id,user);
// }

function setUser(user){ // this generate a json web token
    return jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      secret 
    );
}

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token, secret);
    }
    catch{
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}
const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");

const userSchema = Schema({
    fullName:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    salt:{ // this is used for hashing
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    },
    profileImageUrl:{
        type: String,
        default: "/image.png"
    },
    role:{
        type: String,
        enum: ["User","Admin"],
        default: "User"
    },
},{timestamps: true})

userSchema.pre("save",function(next){ // so whenever we try to save the user this will run and hash the password
    const user = this;
    if(!user.isModified("password"))return;

    const salt = randomBytes(16).toString(); // this is used to generate an unique for every user
    const hashedPassword = createHmac("sha256",salt).update(user.password).digest("hex");
    this.salt = salt;
    this.password = hashedPassword;

    next();
})

const User = model("user",userSchema);
module.exports = User;
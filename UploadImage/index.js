const path = require("path")
const express = require("express")
const multer = require("multer");

const app = express();
const PORT = 5000;

const storage = multer.diskStorage({
  //The disk storage engine gives you full control on storing files to disk.
  destination: function (req, file, cb) {
    // cb(callback) where this function give where the destination should be store at
    return cb(null, "./upload");
  },

  //this would store the filename and it should be unique
  //as a single user can upload a file with same name
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});


// Initializing the multer middleware with the configured storage settings
const upload = multer({storage});
// const upload = multer({ dest: "uploads/" }); // whatever the user upload put it in the upload folder

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended : false})); // this parses the form data

app.get("/",(req,res)=>{
    return res.render("homepage");
})

app.post("/upload", upload.single("profileImage"), (req, res) => {
    console.log(req.body)
    console.log(req.file)

    return res.redirect("/")
});

app.listen(PORT, ()=> console.log(`Server connected at PORT ${PORT}`));
var  bodyParser = require("body-parser"),
     mongoose = require("mongoose"),
     express = require("express")
     app = express();

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/Myblog", 
{ useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set(express.static("/public"));

//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
   title: String,
// Can also add a default image in case a user doesn't have an image {type: String, default: url}
   image: String, 
   body:  String,
   created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//    title: "I am a Youth",
//    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS34sorFBcoeY-xD5ibZs_6MGNHR9x0fX6gPjbn1KHv7vs6LCXz&s",
//    body: "This blog is created for the youth and the teen to educated on the dangers of joining cultism"
// });

//RESTFUL ROUTES
app.get("/", function (req, res) {
   res.redirect("/blogs");
});

app.get("/blogs", function (req, res) {
   //To retrieve Blogs from the database
   Blog.find({}, function(err, blogs){
      if (err){
         console.log(err);
         
      } else {
           res.render("index", {blogs: blogs});
      }
   });
});

//CERATE NEW BLOG 
app.get("/blogs/new", function(req,res){
   res.render("new");
});

app.post("/blogs", function(req,res){
   //Create Blog 
   Blog.create(req.body.blog, function(err, newBlog){
      if (err){
         res.render("/new")
      } else {
         console.log("You Blog was created successful");
         //Redirect to index
         res.redirect("/blogs");         
      }
   })
}); 

//SHOW ROUTE 
app.get("/blogs/:id", function(req, res){
   Blog.findById(req.params.id, function(err, foundBlog){
      if (err){
         res.redirect("/blogs");
      } else {
         res.render("show", {blog: foundBlog});
      }
   })
});

//EDIT ROUTE 
app.get("/blogs/:id/edit", function(req, res){
   Blog.findById(req.params.id, function(err, foundBlog){
      if (err){
         res.redirect("/blogs");
      } else {
         res.render("edit", {blog: foundBlog});
      }
   })
});

//UPDATE ROUTE 
app.put("/blogs/")

app.listen(3030, function () {
   console.log("Your blogApp server is listening on port 3030");   
});

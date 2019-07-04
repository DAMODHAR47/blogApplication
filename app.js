var express =require("express"),
    bodyParser = require("body-parser"),
    mongoose= require("mongoose"),
    methodOverride=require("method-override"),
    app =express();


app.use(express.static('public'));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/blogAppData");
var blogSchema = new mongoose.Schema({
  title: String,
  url: String,
  date: {type:Date,default:Date.now},
  description: String
});
var blog = mongoose.model("blog", blogSchema);

app.get("/",function(req,res){
  res.redirect("/blogs");
});

app.get("/blogs",function(req,res){
  blog.find({},function(err,blogs){
    if(err){
      console.log("err in finding blog");
    }else{
      res.render("index",{blogs:blogs});
    }
  });
});

app.get("/blogs/new",function(req,res){
  res.render("new");
})

app.post("/blog",function(req,res){
  blog.create(req.body.blog,function(err,blog){
    if(err){
      console.log(err);
      res.redirect("new");
    }else{
      res.redirect("/blogs",{blogs:blog});
    }
  });
});

app.get("/blog/:id",function(req,res){
  blog.find({_id:req.params.id},function(err,blog){
    if(err){
      console.log(err);
      res.redirect("/blogs");
    }else{
      res.render("show",{blog:blog[0]});
    }
  });
});

app.get("/blog/:id/edit",function(req,res){
  blog.findById(req.params.id,function(err,editBlog){
    if(err){
      console.log(err);
    }else{
      // console.log(editBlog);
      res.render("edit",{blog:editBlog});
    }
  });
});

app.put("/blog/:id",function(req,res){
  blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
    if(err){
      console.log(err);
    }else{
      res.redirect("/blog/req.params.id");
    }
  });
});

app.delete("/blog/:id",function(req,res){
  blog.findByIdAndRemove(req.params.id,function(err,deletedBlog){
    if(err){
      console.log(err);
    }else{
      res.redirect("/blogs");
    }
  });
});


app.listen(3000,function(){
  console.log("server started");
});

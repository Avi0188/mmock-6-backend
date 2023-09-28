const {Router}=require("express");
const BlogModel = require("../models/Blog.model");
const auth = require("../middlewares/auth.middleware");


const blogRouter=Router()

blogRouter.post("/api/blogs",auth ,async(req,res)=>{
    try {
        
        const {username,title,content,category,date,author}=req.body;

        const newBlog=new BlogModel({
            username,
            title,
            content,
            category,
            date,
            author,
            likes:0,
            comments:[]
        });
        await newBlog.save()
        res.status(200).json(newBlog)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

// get 

blogRouter.get("/api/blogs",auth ,async(req,res)=>{
    try {
        const blogs=await BlogModel.find()
         res.status(200).json(blogs)
      
       
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

// get by search
blogRouter.get("/api/blogs/search",auth ,async(req,res)=>{
    try {
        
const {title}=req.query
const blogs=await BlogModel.find({title:{$regex:title, $options:"i"}})
         res.status(200).json(blogs)
      
       
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


// get by cat
blogRouter.get("/api/blogs/category",auth ,async(req,res)=>{
    try {
        
const {category}=req.query
const blogs=await BlogModel.find(category)
         res.status(200).json(blogs)
      
       
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


// sort by date
blogRouter.get("/api/blogs/sort",auth ,async(req,res)=>{
    try {
        
const {order}=req.query
const sortOrder=order=="asc"?1:-1
const blogs=await BlogModel.find().sort({date:sortOrder})
         res.status(200).json(blogs)
      
       
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})




module.exports=blogRouter
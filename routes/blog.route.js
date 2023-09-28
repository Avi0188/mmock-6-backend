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


module.exports=blogRouter
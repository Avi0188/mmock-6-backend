const mongoose=require("mongoose")

const blogSchema=mongoose.Schema({
    title:String,
    content:String,
    category:String,
    author:String,
    likes:Number,
    date:String,
    comments:[String]
})

const BlogModel=mongoose.model("blog",blogSchema)

module.exports=BlogModel
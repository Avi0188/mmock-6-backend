const mongoose=require("mongoose")

const blogSchema=mongoose.Schema({
    title:String,
    content:String,
    category:String,
    author:String,
    likes:Number,
    date:Date,
    comments:[]
})

const BlogModel=mongoose.model("blog",blogSchema)

module.exports=BlogModel
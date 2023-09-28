const mongoose=require("mongoose")

const blogSchema=mongoose.Schema({
    title:String,
    content:String,
    category:String,
    author:String,
    likes:String,
    date:String,
    comments:[ {
       username: String,
        content: String,
    },]
})

const BlogModel=mongoose.model("blog",blogSchema)

module.exports=BlogModel
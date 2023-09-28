const {Router}=require("express")

const bcrypt=require("bcrypt")


const jwt=require("jsonwebtoken")
const UserModel = require("../models/User.model")



const userRouter= Router()

userRouter.post("/api/register",async(req,res)=>{
    const {email,password}=req.body
    try {

        const existingUser=await UserModel.findOne({email})
        if(existingUser){
            return res.status(400).send({
                err:"User already Registered"
            })
        }
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                return res.status(400).send({err:err})
            }
            const newuser=new UserModel({...req.body,password:hash})
            await newuser.save()
            return res.status(200).send("Registered Successful",newuser)
        })
    } catch (err) {
       return res.status(400).send({err:err.message})
    }
})


// login post

userRouter.post("/api/login",async(req,res)=>{
    try {
        const {email,password}=req.body

        const user=await UserModel.findOne({email})
        if(!user){
            return res.status(400).send({
                err:"User not found"
            })
        }else{
            bcrypt.compare(password,user.password,async(err,data)=>{
                try {
                     if(data){
                        const token=jwt.sign({userId:user._id},"masai")
                    return res.status(200).send({msg:"Login Successful",token})
                }
                } catch (err) {
                    res.status(400).send({err:err.message})
                }
               
                res.status(400).send("Wrong password")
            })
        }
    } catch (err) {
        res.status(400).send({err:err.message})
    }
})





module.exports=userRouter
const jwt= require("jsonwebtoken")

const auth = async(req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1]||null;
        if(!token){
            return res.status(401).send("No token provided")
        }

        const decoded=jwt.verify(token,"masai");
        req.body.userID=decoded.userID
        return next()
    } catch (error) {
        res.status(400).send("unauthorized")
    }
}

module.exports=auth
let jwt =require('jsonwebtoken')
let dotenv=require('dotenv')
dotenv.config()
let verifytoken=async (req,res,next)=>{

    try{
    // let authhead=req.header.authorization
    let authhead = req.headers.authorization;

    if(!authhead || !authhead.startsWith("Bearer ")){
        return res.status(400).json("token is invalid")
    }
    let token=authhead.split(" ")[1]
    let decode=jwt.verify(token,process.env.secretkey)
    if(!decode){
        return res.status(401).json("not verified")
    }
    req.userid=decode.userid
    next()
}catch(error){
    console.log(error)
    res.status(500).json("Server error or token not valid")
}

}
module.exports=verifytoken  


// let jwt = require('jsonwebtoken');
// let dotenv = require('dotenv');
// dotenv.config();

// let verifytoken = async (req, res, next) => {
//     try {
//         let authhead = req.headers.authorization;

//         // ✅ Correct logic: reject if it's missing OR doesn't start with "Bearer "
//         if (!authhead || !authhead.startsWith("Bearer ")) {
//             return res.status(400).json("Token is missing or invalid");
//         }

//         let token = authhead.split(" ")[1];
//         let decode = jwt.verify(token, process.env.secretkey);
//         req.userid = decode.userid;

//         console.log("Decoded user ID:", req.userid); // helpful debug log

//         next();
//     } catch (error) {
//         console.log("Token verification failed:", error.message);
//         return res.status(401).json("Unauthorized");
//     }
// };

// module.exports = verifytoken;

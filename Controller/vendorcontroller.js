
let vendordetails=require('../Models/Vendormodel');
let bcrypt=require('bcryptjs')
let dotenv=require('dotenv')
dotenv.config()
let jwt=require('jsonwebtoken')

let vendorcontroller=async (req,res)=>{
    try {
        let {username,useremail,password}=req.body

        let user=await vendordetails.findOne({username})
        if(user){
            return res.status(400).json({message:"User Exist"})
        }
        let hashpassword=await bcrypt.hash(password,12)
        let userdata=new vendordetails({username,useremail,password:hashpassword})
        await userdata.save()
        res.status(200).json(userdata)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }
}

let vendorlogin=async (req,res)=>{
    let {useremail,password}=req.body
    try {
        let user=await vendordetails.findOne({useremail})
        if(!user){
            return res.status(400).json({message:"User not exist"})

        }

        let decoder=await bcrypt.compare(password,user.password)

        if(!decoder){
            return res.status(401).json({message:"password Not Match"})
        }
        let token= jwt.sign({userid:user._id},process.env.secretkey)

        res.status(200).json({message:"Login successful",token:token})


        
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
        
    }
}




let allvendordetails=async (req,res)=>{
    try {
        
        let getdata=await vendordetails.find().populate('resturant')
        res.status(200).json(getdata)

    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

let getsinglevendordetails=async (req,res) => {
    try {
        let vendorid=req.params.id
        let vendor=await vendordetails.findById(vendorid)
        if(!vendor){
            return res.status(400).json("Vendor Not Found")
        }
        res.status(200).json(vendor)
    } catch (err) {
        console.log(err)
        res.status(500).json("Server Error")
    }
}

module.exports={vendorcontroller,vendorlogin,allvendordetails,getsinglevendordetails}
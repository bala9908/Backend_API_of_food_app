let mongoose=require('mongoose')
const resturant = require('./Resturantmodel')

const vendor=new mongoose.Schema({
    username:{type:String,required:true},
    useremail:{type:String,required:true},
    password:{type:String,required:true},
    resturant:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"resturant"
        }
    ]
})

let vendordetails=new mongoose.model('Vendor',vendor)
module.exports=vendordetails
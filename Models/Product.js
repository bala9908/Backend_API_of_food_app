let mongoose=require('mongoose')
const resturant = require('./Resturantmodel')

let productModel=new mongoose.Schema(
    {
        productname:{
            type:String,
            required:true
        },
        price:{
            type:String,
            required:true
        },
        category:{
            type:[
                {
                    type:String,
                    enum:["Veg","Non-veg"]
                }
            ]
        },
        image:{
            type:String
        },
        bestseller:{
            type:String 
        },
        description:{
            type:String
        },
        resturant:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"resturant"
            }
        ]
    }
)

let productdetails=new mongoose.model("product",productModel)
module.exports=productdetails
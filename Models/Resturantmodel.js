let mongoose=require('mongoose')

let reasturantModel=new mongoose.Schema({
    resturantname:{
        type:String,
        required:true,
        unique:true
    },
    resturanttype:{
        type:[
            {
                type:String,
                enum:["Veg","Non-veg"]
            }
        ]
    },
    regiondishes:{
        type:[
            {
                type:String,
                enum:["South","North","Italian","Chinese"]
            }
        ]
    },
    offer:{
        type:String
    },
    image:{
        type:String
    },
    vendor:[
       {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor"
       }
    ],
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        }
    ]
})

let resturant=new mongoose.model('resturant',reasturantModel)
module.exports=resturant
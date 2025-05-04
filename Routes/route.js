let vendor=require('../Controller/vendorcontroller')
let express=require('express')
let route=express.Router()

route.post('/register',vendor.vendorcontroller)
route.post("/login",vendor.vendorlogin)
route.get("/getall",vendor.allvendordetails)
route.get("/single-vendor/:id",vendor.getsinglevendordetails)
module.exports=route
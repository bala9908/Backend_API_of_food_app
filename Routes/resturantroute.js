let reaturantroute=require('../Controller/resturantcontroller')
let exppress=require('express')
let route=exppress.Router()
let verifytoken=require('../Middleware/middleware')

route.post('/addresturant',verifytoken,reaturantroute.resturancontoller)
module.exports=route
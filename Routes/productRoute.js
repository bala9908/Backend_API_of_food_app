let productcontroller=require('../Controller/productcontoller')
let express=require('express')
let  route=express.Router()

route.post('/addproduct/:resturantid',productcontroller.productController)
route.get("/get/:id",productcontroller.getallproducts)
route.get('/uploads/:imagename', async(req,res)=>{
    let imageName=req.params.imagename
    res.setHeader('Content-Type','image/jpeg');
    res.sendFile(Path.join(__dirname,'..','uploads',imageName))
})
route.delete('/:resturantid/delete/:productId',productcontroller.deleteProductById)
module.exports=route
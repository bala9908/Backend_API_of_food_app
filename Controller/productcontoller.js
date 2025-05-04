let prodctmodel=require('../Models//Product')
let multer=require('multer')
let path=require('path')
let resturantModel=require('../Models/Resturantmodel')

let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({storage:storage})

let productController=async (req,res)=>{
    let {productname,price,category,bestseller,description}=req.body
    let image=req.file?req.file.filename:undefined
    try {
        let resturantid=req.params.resturantid

        let resturant=await resturantModel.findById(resturantid)
        if(!resturant){
            return res.status(400).json('Resturant Not found')
        }
        let productObject=new prodctmodel({productname,price,category,bestseller,description,image,resturant:resturantid})

        let saveddata=await productObject.save()

        resturant.products.push(saveddata)
        resturant.save()
        res.status(200).json(resturant)



    } catch (error) {
        console.log(error)
        res.status(500).json('Server Error')
        
    }
}


let getallproducts=async (req,res)=>{
        try {
            let restruantid=req.params.id
            let resturant=await resturantModel.findById(restruantid)
            if(!resturant){
                return res.status(200).json("Resturant Not Found")
            }
            let resturantname=resturant.resturantname
            let products=await prodctmodel.find({resturant:restruantid})
            return res.status(200).json({products,resturantname})

        } catch (error) {
            console.log(error)
            res.status(500).json("Server error")
        }
}


let deleteProductById=async (req,res) => {
    
        try {
            const { restaurantId, productId } = req.params;

            const product = await prodctmodel.findOne({ productId, restaurantId });
            if (!product) {
                return res.status(404).json({ message: 'Product not found or does not belong to this restaurant' });
            }
    
            const deleted = await prodctmodel.findByIdAndDelete(productId);
            return res.status(200).json({ message: 'Product deleted', deleted });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error', error });
        }
    
    
}

module.exports={productController:[upload.single('image'),productController],getallproducts,deleteProductById}
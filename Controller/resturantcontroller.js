let resturant=require('../Models/Resturantmodel')
let mullter=require('multer')
let vendor=require('../Models/Vendormodel')

let storage=mullter.diskStorage({
    destination:(req,file,cb)=>{cb(null,'uploads/')},
    filename:(req,file,cb)=>{cb(null,Date.now()+'_'+file.originalname)}
})

let upload=mullter({storage:storage})

let resturancontoller=async (req,res) => {
    let {resturantname, resturanttype,regiondishes,offer}=req.body

    let image=req.file?req.file.filename:undefined
    try {
        let vendoruser=await vendor.findById(req.userid)
        if(!vendoruser){
            return res.status(400).json('resturant  exist')
        }
        let data=new resturant({resturantname,resturanttype,regiondishes,offer,image,vendor:vendoruser._id})

       let saveddata= await data.save()
        vendoruser.resturant.push(saveddata)
        await vendoruser.save()
        res.status(200).json(data)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports={resturancontoller:[upload.single('image'),resturancontoller]}
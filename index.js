let express=require('express')
let mongoose=require('mongoose')
let dotenv=require('dotenv')
let app=express()
let body=require('body-parser')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
dotenv.config()
let route=require('./Routes/route')
let resturantroute=require('./Routes/resturantroute')
let productroute=require('./Routes/productRoute')


let port=process.env.PORT||5018

app.use('/provider',route)
app.use('/resturant',resturantroute)
app.use('/providerresturant',productroute)
app.listen(port,()=>{
    console.log('server Running on the port of 5018')
})
mongoose.connect(process.env.Mongo)
.then(()=>{
    console.log('connected')
})
.catch((err)=>{console.log(err)})


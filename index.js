const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const userRoutes=require('./routes/userRoutes')

const app=express()
dotenv.config()

const port=process.env.PORT||5000

app.use(express.json())


app.use('/api/users',userRoutes)
//mongoDB connection

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongoDB Connected")
    app.listen(port,()=>console.log(`server started at:${port}`))
})
.catch(err=>{
    console.error("mongoDB connection error",err)
})

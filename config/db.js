import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()


mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("DB connected")
})
.catch((err)=>{
    console.log(err)
    
})
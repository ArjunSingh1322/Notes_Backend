// import express from "express"


// const app = express()


// const PORT = process.env.PORT || 5047

// import "./config/db.js"

// import user from "./model/user.model.js"
// import notes from "./model/notes.model.js"




// app.listen(PORT,()=>{
//     console.log(`your backend is live on ${PORT}` )
// })







import express from 'express'
import cors from "cors"
const app = express() 
const PORT = process.env.PORT || 5047 

// call database: 
import "./config/db.js"

import User from "./model/user.model.js"
import Notes from "./model/notes.model.js"

// routes: 
import notesRoutes from "./routes/notes.routes.js"

// middlewares: 
app.use(cors())  
app.use(express.json())

app.use("/notes", notesRoutes)

// ✅ Root route (for Vercel)
app.get("/", (req, res) => {
  res.send("Backend is running successfully on Vercel!");
});

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})

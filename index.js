    // // import express from "express"


    // // const app = express()


    // // const PORT = process.env.PORT || 5047

    // // import "./config/db.js"

    // // import user from "./model/user.model.js"
    // // import notes from "./model/notes.model.js"




    // // app.listen(PORT,()=>{
    // //     console.log(`your backend is live on ${PORT}` )
    // // })







    // import express from 'express'
    // import cors from "cors"
    // const app = express() 
    // const PORT = process.env.PORT || 5047 

    // // call database: 
    // import "./config/db.js"

    // import User from "./model/user.model.js"
    // import Notes from "./model/notes.model.js"

    // // routes: 
    // import notesRoutes from "./routes/notes.routes.js"

    // // middlewares: 
    // app.use(cors())  
    // app.use(express.json())

    // app.use("/notes", notesRoutes)

    // // ✅ Root route (for Vercel)
    // app.get("/", (req, res) => {
    // res.send("Backend is running successfully on Vercel!");
    // });

    // app.listen(PORT, ()=> {
    //     console.log(`Server is running on port ${PORT}`)
    // })


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";
import notesRoutes from "./routes/notes.routes.js";

dotenv.config();

let app = express();

// middlewares

app.use(cors({
  origin: [
    "https://your-frontend.vercel.app", // 👈 replace with your real frontend URL
    "http://localhost:5173"             // 👈 keep this for local dev (Vite)
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// root route
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully on Vercel & Local!");
});

// main routes
app.use("/notes", notesRoutes);

// port setup
let PORT = process.env.PORT || 5047;

// listen only if running locally
  // app.listen(PORT, () => {
  //   console.log(`✅ Server running locally on http://localhost:${PORT}`);
  // });


// export for Vercel
export default app;

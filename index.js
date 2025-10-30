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

// ✅ Allow all origins (no CORS restriction)
app.use(
  cors({
    origin: "*", // allows requests from anywhere
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// root route
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully on Vercel & Local!");
});

// main routes
app.use("/notes", notesRoutes);

// port setup
let PORT = process.env.PORT || 5047;

// ✅ Run server only locally (not on Vercel)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✅ Server running locally on http://localhost:${PORT}`);
  });
}

// ✅ Export app for Vercel
export default app;

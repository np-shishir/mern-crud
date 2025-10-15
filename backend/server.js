import express from 'express';

import path from "path"

const app  = express();
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js'
dotenv.config();
app.use(express.json()) //to accept json data in req.body
import cors from "cors";
app.use(cors());
app.use("/api/products", productRoutes)

const __dirname = path.resolve();

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html" ))
    })
}

const port = process.env.PORT || 5000

app.listen(port, ()=>{
    connectDB();
    console.log(`Server started at http://localhost:${port}`);
})

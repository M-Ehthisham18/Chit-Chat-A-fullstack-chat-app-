import express from "express";
import dotenv from "dotenv"
import connectDB from "./src/database/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path"

import authRoutes from "./src/routes/auth.route.js"
import messageRoutes from "./src/routes/message.route.js"
import {app, server} from "./src/lib/socket.js"

import deleteMessages from "./src/seeds/delete.message.js";
dotenv.config();

const PORT = process.env.PORT || 8080;
connectDB();

const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(cors(
  {origin:["http://localhost:5174","http://localhost:5173"],
    credentials: true,
  }
))



app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
// deleteMessages();

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}


server.listen(PORT, () => {
  console.log(`server is running on PORT : http://localhost:${PORT}`);
  
})
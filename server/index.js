import  express  from "express";
import mongoose from "mongoose";
import cors from "cors";
import  Jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express ()


const port = process.env.PORT || 3000;
app.listen(port , ()=>console.log(`listen on port ${port}`))
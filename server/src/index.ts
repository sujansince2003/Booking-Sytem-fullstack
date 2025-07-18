import express, { Request, Response } from "express"
import cors from "cors"
import path from "path"
import "dotenv/config"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/users.routes"
import LoginRoutes from "./routes/auth.routes"
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true
}))

mongoose.connect(process.env.MONGODB_URI as string).then(() => {
    console.log("connected")
})


// run frontend static files in same server (BE and FE)

app.use(express.static(path.join(__dirname, "../../client/dist")))




app.use("/api/user", userRoutes);
app.use("/api/auth", LoginRoutes);

app.listen(8000, () => {
    console.log("BACKEND SERVER::running in port  8000. visit: http://localhost:8000")
})
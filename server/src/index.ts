import express, { Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import userRoutes from "./routes/users"
const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

mongoose.connect(process.env.MONGODB_URI as string).then(() => {
    console.log("connected")
})


app.get("/", (req: Request, res: Response) => {
    res.json({ msg: "hello" })
})

app.use("/api/user", userRoutes)

app.listen(8000, () => {
    console.log("BACKEND SERVER::running in port  8000. visit: http://localhost:8000")
})
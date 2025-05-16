import express, { Request, Response } from "express"
import cors from "cors"
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())



app.get("/", (req: Request, res: Response) => {
    res.json({ msg: "hello" })
})

app.listen(8000, () => {
    console.log("BACKEND SERVER::running in port  8000. visit: http://localhost:8000")
})
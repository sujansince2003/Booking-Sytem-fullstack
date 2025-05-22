import { Router, Request, Response } from "express";
import { z } from "zod"
import User from "../models/user.model";
const router = Router();
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const loginSchema = z.object({
    email: z.string().email("invalid email format"),
    password: z.string()
})

// defining login routes

router.post("/login", async (req: Request, res: Response) => {

    const loginValidation = loginSchema.safeParse(req.body);
    if (!loginValidation.success) {
        res.json({ msg: loginValidation.error })
        return;
    }

    const { email, password } = loginValidation.data;

    try {





        const isUserExist = await User.findOne({
            email: email
        })

        if (!isUserExist) {
            res.status(404).json({ msg: "user doesnot exist" })
            return;
        }

        const validPassword = await bcrypt.compare(password, isUserExist.password)
        if (!validPassword) {
            res.status(400).json({ msg: "Invalid credentials" })
            return;
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: isUserExist._id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: "1d" }
        );

        // Set secure cookie
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
            sameSite: "strict"
        });

        // Return success response
        res.status(201).json({ message: 'Success', userId: isUserExist._id });
        return
    } catch (error) {

        console.log(error);
        res.status(500).json({ msg: "error occured", Err: error });
        return;
    }











})




export default router;
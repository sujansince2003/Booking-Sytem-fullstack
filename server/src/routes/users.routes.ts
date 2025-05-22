import { Router, Request, Response } from "express";
import User from "../models/user.model";
import { z } from "zod"
import jwt from "jsonwebtoken";
const router = Router();

// defining zod validation schema for register body
const registerSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email("invalid email format"),
    password: z.string().min(6, "password length should be atleast 6")
})


router.post("/register", async (req: Request, res: Response) => {
    // validating the request body
    const Registervalidation = registerSchema.safeParse(req.body);


    // handling the request validation fails
    if (!Registervalidation.success) {
        res.json({ msg: Registervalidation.error })
        return;
    }

    const { email, password, firstName, lastName } = req.body;
    try {
        // Validate request body
        if (!email || !password || !firstName || !lastName) {
            res.status(400).json({
                msg: "Email, password, first name, and last name are required"
            });
            return;
        }

        // Check if user exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            res.status(400).json({
                msg: "User already exists"
            });
            return
        }



        // Save user
        const user = new User({
            email,
            password,
            firstName,
            lastName
        });
        await user.save();


        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
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
        res.status(201).json({ message: 'Success' });
        return

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: 'Error occurred' });
        return
    }
});

export default router;
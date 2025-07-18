import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            userId: string
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth_token"]
    if (!token) {
        res.status(401).json({ msg: " unauthorized" });
        return;

    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        req.userId = (decodedToken as JwtPayload).userId;
        next();



    } catch (error) {
        res.status(401).json({ msg: " unauthorized" });
        return;
    }
}

export default verifyToken;
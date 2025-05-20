
import mongoose from "mongoose"

// defining type for type safety
export type UserType = {
    _id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

// defining user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    firstName: {
        type: String, required: true
    },
    lastName: {
        type: String, required: true
    }
})

// creating user model
const User = mongoose.model<UserType>("User", userSchema);

export default User;
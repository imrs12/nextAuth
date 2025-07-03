import mongoose, {Model, Schema} from 'mongoose';

interface UserType {
    username: string,
    password: string,
    email: string,
    isAdmin: Boolean,
    isVerified: Boolean,
    forgotPasswordToken: string,
    forgotPasswordTokenExpiry: Date,
    verifyToken: string,
    verifyTokenExpiry: Date
}

const userSchema: Schema<UserType> = new Schema<UserType>({
    username: {
        type: String,
        unique: true,
        required: [true, "Please provide a username"]
    }, 
    email:{
        type: String,
        required: [true, "Please provide a email"],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User: Model<UserType>= mongoose.models?.User || mongoose.model<UserType>("User", userSchema)

export default User


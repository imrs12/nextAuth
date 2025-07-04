import dbConnect from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse} from "next/server"
import bcrypt from "bcryptjs";
import { sendEmail } from "@/utils/mail";

dbConnect();

export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json();
        const {username, email, password} = reqBody;

        //checking whether user already or not
        const user = await User.findOne({email})
        if( user ){
            return NextResponse.json({error: "User Already Exists"}, { status: 400})
        }
        
        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        const hashedPassword = await bcrypt.hash(password,salt)

        //creating new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })
        console.log(newUser);

        sendEmail({email, emailType: 'VERIFY', userId: newUser._id })

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            newUser
        })
        
    } catch (error: unknown) {
        return NextResponse.json({
            error: error,
        }, {
            status: 500
        })
    }
    
}
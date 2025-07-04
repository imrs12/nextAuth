import User from "@/model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest){
        try {

            const reqBody = await req.json();
            const { email, password } = reqBody;

            const user = await User.findOne({email});

            if( !user ){
                return NextResponse.json({message: "User does not exists"}, { status: 400})
            }

            const validPassword = await bcrypt.compare(password, user.password)

            if( !validPassword ){
                return NextResponse.json({message: "Password not matched "}, { status: 400 })
            }
            
            const TokenData = {
                id: user._id,
                username: user.username,
                email: user.email
            }
            const token = jwt.sign(TokenData, process.env.JWT, { expiresIn: "1d"});

            const response = NextResponse.json({
                token: token,
                success: true,
                message: "Login succesfully"
            })

            response.cookies.set("token", token,{
                httpOnly: true
            })

            return response
            
        } catch (error: any) {
           return NextResponse.json({
            error: error.message
           },{
            status: 500
           })
        }
}
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST( req: NextRequest){
    try {

        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');
        
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry:{$gt: Date.now()}})

        if(!user){
            return NextResponse.json({
                message: "Invalid Token or Expired"
            }, {
                status: 400
            })
        }
        console.log(user);
        
        const userId = user._id
        await User.findByIdAndUpdate(userId,{
            isVerified: true, 
            $unset:{            // hides the field in the database as it is not needed after verification
                verifyToken : "",    
                verifyTokenExpiry:""
            }
        })

        return NextResponse.json(
            { message: "EmailVerified Successfully",
                Success: true
            },
        )

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
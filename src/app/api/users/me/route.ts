import dbConnect from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { getTokenData } from "@/utils/getTokenData";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function GET(req: NextRequest){
    try {
        const userId = await getTokenData(req);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
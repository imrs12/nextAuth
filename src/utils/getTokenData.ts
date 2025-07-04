import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { decode } from "punycode";

export async function getTokenData( req: NextRequest){
    try {
        const token = req.cookies.get("token")?.value || "";
        
        const decodedToken: any = jwt.verify(token, process.env.JWT)

        return decodedToken.id
    } catch (error: any) {
        throw new Error(error.message)
    }

}
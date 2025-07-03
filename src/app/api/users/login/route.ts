import { NextRequest, NextResponse } from "next/server";

export default function POST(req: NextRequest){
        return NextResponse.json({
            message: "Login Page"
        })
}
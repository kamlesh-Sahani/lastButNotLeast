import dbConnect from "@/src/app/lib/dbConnect";
import { NextResponse } from "next/server";

dbConnect();
export async function GET(){
    try {
        const response = NextResponse.json({
            success:true,
            message:"logout successfuly"
        },{status:200})
        
        const option={httpOnly:true,expires:new Date(0)};
        console.log(response.cookies.getAll,"cookies")
        response.cookies.set("accessToken","",option);
        response.cookies.set("refreshToken","",option);
        return response;
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:`error on logout : ${error}`
        },{status:500})
    }
}
import { NextResponse,NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const  getDataFromCookie=async(req:NextRequest)=>{
    try {
        const accessToken = req.cookies.get("accessToken")?.value ;
        if(!accessToken){
            return NextResponse.json({
                success:false,
                message:"cookie is not found"
            },{status:400})
        }
        const decodedToken:any = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET!);
        return decodedToken?._id;
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"failed to get user data from the cookie"
        },{status:500})
    }
}
import dbConnect from "@/lib/dbConnect";
import LeaveTypesModel from "@/models/LeaveType.model";
import { NextResponse,NextRequest } from "next/server";
dbConnect();
export async function POST(req:NextRequest){
    try {
        const reqBody = await req.json();
        const {name,description,allowances,rules} = reqBody;
        const {monthly,yearly,weekly} = allowances;
        if(!name || !description || !monthly || !yearly || !weekly || !rules){
            return NextResponse.json({
                success:true,
                message:"please fill the all fields "
            },{status:400});
        }
        const lowerName = name.toLowerCase().trim();
        const isExist= await LeaveTypesModel.findOne({name:lowerName});
        if(isExist){
            return NextResponse.json({
                success:false,
                message:"Leave type is alreay exist"
            },{status:400})
        }
        const leaveType = await LeaveTypesModel.create({
            name:lowerName,
            description,
            allowances
        })
        if(!leaveType){
            return NextResponse.json({
                success:false,
                message:"something went error while creating leave type "
            },{status:400})
        }
        return NextResponse.json({
            success:true,
            message:"successfuly created",
            leaveType
        },{status:201})
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:`faild to create leave type: ${error.message}`
        },{status:500})
    }
}
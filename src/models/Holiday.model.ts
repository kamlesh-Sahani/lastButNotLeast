import mongoose,{Schema,Document} from "mongoose";

export interface HolidayType  extends Document{
    createdAt:Date;
    updatedAt:Date;
    holidayName:string;
    holidayDate:Date;
}

const holidaySchema = new Schema<HolidayType>({
    holidayName:{
        type:String,
        required:[true,"please enter the holiday name"]
    },
    holidayDate:{
        type:Date,
        required:[true,"please enter the holiday date"]
    }
},{timestamps:true});


const HolidayModel = (mongoose.models.Holiday as mongoose.Model<HolidayType>) || mongoose.model("Holiday",holidaySchema);

export default HolidayModel;
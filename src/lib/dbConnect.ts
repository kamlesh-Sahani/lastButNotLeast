import mongoose from "mongoose";
interface ConnectionType{
    isConnected?:number;
}
const connection:ConnectionType={};
async function dbConnect(){
    try {
        if(connection.isConnected){
        console.log("database is already connected");
            return;
        }

        const db = await mongoose.connect(process.env.MONGO_URI!,{dbName:"lms"})
        connection.isConnected = db.connections[0].readyState;
        console.log("database connected successfuly: ",db.connection.host);
    } catch (error) {
        console.log("database connection error",error)
    }
}

export  default dbConnect;
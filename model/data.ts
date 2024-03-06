import mongoose,{ Schema } from "mongoose";
interface dataProps{
    name:string;
    phoneNumber:string;
    email:string;
    hobbies:string[];
}

const dataSchema = new mongoose.Schema<dataProps>({
    name:{type:String, required:true},
    phoneNumber:{type:String,required:true},
    email:{type:String,required:true},
    hobbies:{type:Array,required:true}
},
    {timestamps:true}
)


export default mongoose.models?.Data || mongoose.model("Data", dataSchema);
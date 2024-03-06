import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    name:{type:String, required:true},
    phoneNumber:{type:String,required:true},
    email:{type:String,required:true},
    hobbies:{type:Array<String>(),required:true}
},
    {timestamps:true}
)


export default mongoose.models?.Data || mongoose.model("Data", dataSchema);
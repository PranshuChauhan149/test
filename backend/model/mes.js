import mongoose from "mongoose";

const mesSchema =new mongoose.Schema({
  message : {
    type:String,
    required:true
  }
},{timestamps:true})

const Message = mongoose.model("Message",mesSchema);
export default Message
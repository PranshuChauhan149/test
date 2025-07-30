import mongoose from "mongoose";

const connectDb = ()=>{
  try{
    const res = mongoose.connect(process.env.MOG_URL)
  if(res){
    console.log("Db connected");
    
  }
  }
  catch(error){
    console.log("db error");
    
  }
}

export default connectDb
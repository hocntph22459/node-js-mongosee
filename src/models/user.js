import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minLength:3,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        minLength:6,
        require:true
    }
})
export default mongoose.model("User",userSchema)
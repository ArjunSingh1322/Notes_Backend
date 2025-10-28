import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username:{
    type: String, 
    required: true, 
    minLength: [3, "Username must be at least 3 characters long"],
    unique: true,
    trim: true,
  }
  
},
{
    timestamps: true,
}

)

const User = mongoose.model("User", userSchema)

export default User
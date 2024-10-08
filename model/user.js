import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  phone:{
    type: String, 
    require: true
  }
});

userSchema.pre('save', async function(next){
  const user = this;

  if(!user.isModified('password')) return next();

  try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    
    user.password = hashedPassword;
    next();

  }catch(error){
    return next(error);
  }
})

userSchema.methods.comparePassword = async function(userPassword){
  try{
    const isMatchedPassword = await bcrypt.compare(userPassword, this.password);
    return isMatchedPassword;
  }catch(error){
    console.log(error);
  }
}

const userModel = mongoose.model("userModel", userSchema);

export default userModel;

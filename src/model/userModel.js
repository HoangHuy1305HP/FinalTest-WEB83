import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: String, 
    emailAddress: { type: String, unique: true }, 
    contactNumber: String, 
    residentialAddress: String, 
    idNumber: String, 
    dateOfBirth: Date, 
    deletedStatus: { type: Boolean, default: false }, 
    userRole: String, 
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

export default User;

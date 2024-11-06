import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  activeStatus: { type: Boolean, default: true }, 
  deletedStatus: { type: Boolean, default: false }, 
  teacherCode: { type: String, unique: true }, 
  start_date: Date, 
  end_date: Date,   
  positionRefs: [
    { type: mongoose.Schema.Types.ObjectId, ref: "TeacherPosition" }, 
  ],
  qualifications: [  
    {
      qualificationType: { type: String }, 
      institution: String, 
      specialization: String, 
      graduationYear: Number, 
      graduated: Boolean, 
    },
  ],
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

export default Teacher;

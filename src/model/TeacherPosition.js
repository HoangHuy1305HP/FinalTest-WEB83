import mongoose from "mongoose";

const PositionSchema = new mongoose.Schema({
  title: String, 
  positionCode: { type: String, unique: true }, 
  description: String, 
  statusActive: { type: Boolean, default: true }, 
  statusDeleted: { type: Boolean, default: false }, 
});

const Position = mongoose.model("Position", PositionSchema);

export default Position;

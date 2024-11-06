import express from "express";
import {
  addPosition,          
  addTeacher,           
  listPositions,        
  fetchTeachers,        
} from "../controller/userController.js";

const router = express.Router();

// Thay đổi các endpoint cho phù hợp với các tên hàm và schema đã cập nhật
router.get("/teachers", fetchTeachers);           
router.post("/teachers", addTeacher);           
router.get("/teacher-positions", listPositions); 
router.post("/create-position", addPosition);    

export default router;

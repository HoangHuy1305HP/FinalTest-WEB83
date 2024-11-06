import User from "../model/userModel.js";
import Teacher from "../model/Teacher.js";
import Position from "../model/TeacherPosition.js"; // Đổi TeacherPosition thành Position
import { v4 as uuidv4 } from "uuid";

// 1.1 GET /teachers - Lấy danh sách giáo viên với thông tin chi tiết
export const fetchTeachers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const teacherList = await Teacher.find({ deletedStatus: false }) // đổi isDeleted thành deletedStatus
      .populate("userId", "fullName emailAddress contactNumber residentialAddress") // đổi các trường cho phù hợp
      .populate("positionRefs", "title") // đổi teacherPositions thành positionRefs, name thành title
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(teacherList);
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve teachers." });
  }
};

// 1.3 POST /teachers - Tạo mới giáo viên
export const addTeacher = async (req, res) => {
  const { fullName, emailAddress, contactNumber, residentialAddress, qualifications, positionRefs } = req.body;

  try {
    // Tạo user mới trong bảng User
    const newUser = new User({
      fullName,
      emailAddress,
      contactNumber,
      residentialAddress,
      userRole: "TEACHER", // đổi role thành userRole
    });
    await newUser.save();

    // Tạo mã code ngẫu nhiên, đảm bảo không trùng lặp
    let uniqueTeacherCode;
    do {
      uniqueTeacherCode = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    } while (await Teacher.exists({ teacherCode: uniqueTeacherCode })); // đổi code thành teacherCode

    const newTeacher = new Teacher({
      userId: newUser._id,
      teacherCode: uniqueTeacherCode, // đổi code thành teacherCode
      qualifications, // đổi degrees thành qualifications
      positionRefs, // đổi teacherPositions thành positionRefs
    });

    await newTeacher.save();

    res.status(201).json({ message: "Teacher created successfully", newTeacher });
  } catch (err) {
    res.status(500).json({ error: "Unable to add teacher." });
  }
};

// 1.4 GET /teacher-positions - Lấy danh sách vị trí công tác
export const listPositions = async (req, res) => {
  try {
    const allPositions = await Position.find({ statusDeleted: false }); // đổi isDeleted thành statusDeleted
    res.status(200).json(allPositions);
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve positions." });
  }
};

// 1.5 POST /teacher-positions - Tạo vị trí công tác mới
export const addPosition = async (req, res) => {
  const { title, description } = req.body; // đổi name thành title

  try {
    // Sinh mã code ngẫu nhiên, đảm bảo không trùng lặp
    let generatedPositionCode;
    do {
      generatedPositionCode = uuidv4();
    } while (await Position.exists({ positionCode: generatedPositionCode })); // đổi code thành positionCode

    const newPosition = new Position({ title, positionCode: generatedPositionCode, description }); // đổi các trường tương ứng
    await newPosition.save();

    res.status(201).json({ message: "Position created successfully", newPosition });
  } catch (err) {
    res.status(500).json({ error: "Unable to create position." });
  }
};

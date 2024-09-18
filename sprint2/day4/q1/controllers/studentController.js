const studentService = require("../services/studentService");

exports.getStudents = async (req, res) => {
  console.log("getStudents: ");
  try {
    const students = await studentService.getAllStudents();
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const newStudent = req.body;
    console.log("new data: controller", newStudent);
    await studentService.addStudent(newStudent);
    return res.status(201).json({ message: "student added success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    await studentService.deleteStudent(studentId);
    return res.status(200).json({ message: "student delete success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.filterStudents = async (req, res) => {
  try {
    const filters = req.query;
    const filteredStudents = await studentService.filterStudents(filters);
    return res.status(200).json(filteredStudents);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

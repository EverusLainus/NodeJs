const express = require("express");
const {
  getStudents,
  addStudent,
  deleteStudent,
  filterStudent,
} = require("../controllers/studentController");
const { filterStudents } = require("../services/studentService");
const { authenticateToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getStudents);

router.post("/add", authenticateToken, addStudent);

router.get("/filter", authenticateToken, filterStudents);

router.delete("/delete/:id", authenticateToken, deleteStudent);

module.exports = router;

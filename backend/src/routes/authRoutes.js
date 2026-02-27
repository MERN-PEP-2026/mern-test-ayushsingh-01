const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

const router = express.Router();

const createToken = (studentId) => {
  return jwt.sign({ id: studentId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email,
      password: hashedPassword
    });

    const token = createToken(student._id);

    return res.status(201).json({
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(student._id);

    return res.status(200).json({
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;

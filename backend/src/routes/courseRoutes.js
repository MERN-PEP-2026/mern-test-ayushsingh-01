const express = require("express");
const Course = require("../models/Course");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", async (req, res) => {
  try {
    const { courseName, courseDescription, instructor } = req.body;

    if (!courseName || !courseDescription || !instructor) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const course = await Course.create({
      courseName,
      courseDescription,
      instructor
    });

    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;

import { useState } from "react";

const initialForm = {
  courseName: "",
  courseDescription: "",
  instructor: ""
};

export default function CourseForm({ onCreate, loading }) {
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onCreate(formData);
    setFormData(initialForm);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Create Course</h3>
      <input
        name="courseName"
        placeholder="Course Name"
        value={formData.courseName}
        onChange={handleChange}
        required
      />
      <textarea
        name="courseDescription"
        placeholder="Course Description"
        value={formData.courseDescription}
        onChange={handleChange}
        required
      />
      <input
        name="instructor"
        placeholder="Instructor"
        value={formData.instructor}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Course"}
      </button>
    </form>
  );
}

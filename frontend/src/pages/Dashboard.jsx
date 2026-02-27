import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseForm from "../components/CourseForm";
import CourseList from "../components/CourseList";
import { createCourse, deleteCourse, getCourses } from "../services/courseService";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { student, logout } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [creatingCourse, setCreatingCourse] = useState(false);
  const [error, setError] = useState("");

  const handleApiError = (err, fallbackMessage) => {
    if (err.response?.status === 401 || err.message === "Missing authentication token") {
      logout();
      navigate("/login", { replace: true });
      return;
    }
    setError(err.response?.data?.message || fallbackMessage);
  };

  const loadCourses = async () => {
    setLoadingCourses(true);
    setError("");
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      handleApiError(err, "Failed to load courses");
    } finally {
      setLoadingCourses(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleCreate = async (payload) => {
    setCreatingCourse(true);
    setError("");
    try {
      await createCourse(payload);
      await loadCourses();
    } catch (err) {
      handleApiError(err, "Failed to create course");
    } finally {
      setCreatingCourse(false);
    }
  };

  const handleDelete = async (courseId) => {
    setError("");
    try {
      await deleteCourse(courseId);
      setCourses((prev) => prev.filter((course) => course._id !== courseId));
    } catch (err) {
      handleApiError(err, "Failed to delete course");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="page dashboard-page">
      <header className="dashboard-header">
        <div>
          <h2>Courses Dashboard</h2>
          <p>Welcome, {student?.name || "Student"}</p>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </header>

      {error && <p className="error">{error}</p>}

      <div className="dashboard-grid">
        <CourseForm onCreate={handleCreate} loading={creatingCourse} />
        <CourseList courses={courses} onDelete={handleDelete} loading={loadingCourses} />
      </div>
    </div>
  );
}

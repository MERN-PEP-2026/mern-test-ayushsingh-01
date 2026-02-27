export default function CourseList({ courses, onDelete, loading }) {
  return (
    <div className="card">
      <h3>All Courses</h3>
      {loading ? (
        <p>Loading courses...</p>
      ) : courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <ul className="course-list">
          {courses.map((course) => (
            <li key={course._id}>
              <div>
                <h4>{course.courseName}</h4>
                <p>{course.courseDescription}</p>
                <span>Instructor: {course.instructor}</span>
              </div>
              <button className="danger" onClick={() => onDelete(course._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

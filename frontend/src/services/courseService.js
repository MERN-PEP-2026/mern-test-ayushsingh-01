import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Missing authentication token");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const createCourse = async (payload) => {
  const response = await axios.post(`${API_BASE_URL}/courses`, payload, getAuthConfig());
  return response.data;
};

export const getCourses = async () => {
  const response = await axios.get(`${API_BASE_URL}/courses`, getAuthConfig());
  return response.data;
};

export const deleteCourse = async (courseId) => {
  const response = await axios.delete(`${API_BASE_URL}/courses/${courseId}`, getAuthConfig());
  return response.data;
};

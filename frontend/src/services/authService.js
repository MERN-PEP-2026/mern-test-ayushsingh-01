import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const registerStudent = async (payload) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, payload);
  return response.data;
};

export const loginStudent = async (payload) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, payload);
  return response.data;
};

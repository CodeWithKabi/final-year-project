import axios from "axios";

const API = "https://sleep-disorder-backend-s7oq.onrender.com";

export const registerUser = async (data) => {
  return axios.post(`${API}/register`, data);
};

export const loginUser = async (data) => {
  return axios.post(`${API}/login`, data);
};
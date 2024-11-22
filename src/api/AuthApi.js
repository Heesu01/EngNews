import { Axios } from "./Axios";

export const signUp = async (userData) => {
  try {
    const response = await Axios.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const login = async (credentials) => {
  try {
    const response = await Axios.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = async () => {
  try {
    const response = await Axios.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

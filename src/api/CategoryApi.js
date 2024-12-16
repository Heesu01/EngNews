import { Axios } from "./Axios";

export const fetchNaverCategories = async () => {
  try {
    const response = await Axios.get("/categories/naver");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
export const fetchNytCategories = async () => {
  try {
    const response = await Axios.get("/categories/nyt");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await Axios.post("/categories", categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await Axios.delete(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchKeywords = async (categoryId) => {
  try {
    const response = await Axios.get(`/keywords/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createKeyword = async (keywordData) => {
  try {
    const response = await Axios.post("/keywords", keywordData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteKeyword = async (keywordId) => {
  try {
    const response = await Axios.delete(`/keywords/${keywordId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchCategoryKeywords = async () => {
  try {
    const response = await Axios.get("/categories/info");
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

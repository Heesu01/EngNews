import { Axios } from "./Axios";

export const fetchNaverTop5News = async () => {
  try {
    const response = await Axios.get("/news/naver/top5");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchNytTop5News = async () => {
  try {
    const response = await Axios.get("/news/nyt/top5");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchNaverArticlesByCategory = async (category, page) => {
  try {
    const response = await Axios.get(`/news/naver/categories`, {
      params: { category, page },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchNytArticlesByCategory = async (category, page) => {
  try {
    const response = await Axios.get(`/news/nyt/categories`, {
      params: { category, page },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchNaverArticlesByKeyword = async () => {
  try {
    const response = await Axios.get("/news/naver/keyword");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
export const fetchNytArticlesByKeyword = async () => {
  try {
    const response = await Axios.get("/news/nyt/keyword");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

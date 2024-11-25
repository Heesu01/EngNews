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

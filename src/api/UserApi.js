import { Axios } from "./Axios";

export const userApi = {
  getUserDetails: async () => {
    try {
      const response = await Axios.get("/users");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteUser: async (password) => {
    try {
      const response = await Axios.delete("/users", {
        data: password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getLikedWords: async () => {
    try {
      const response = await Axios.get("/words-like");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getLikedNaverArticles: async () => {
    try {
      const response = await Axios.get("/articles-like/naver");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getLikedNytArticles: async () => {
    try {
      const response = await Axios.get("/articles-like/nyt");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteLikedWord: async (keywordId) => {
    try {
      const response = await Axios.delete(`/words-like/${keywordId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

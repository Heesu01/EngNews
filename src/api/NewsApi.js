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

export const fetchNaverArticlesByCategory = async (
  category,
  page,
  sort = "date"
) => {
  try {
    const response = await Axios.get(`/news/naver/categories`, {
      params: { category, page, sort },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchNytArticlesByCategory = async (
  category,
  page,
  sort = "newest"
) => {
  try {
    const response = await Axios.get(`/news/nyt/categories`, {
      params: { category, page, sort },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchNaverArticlesByKeyword = async (sort = "date") => {
  try {
    const response = await Axios.get("/news/naver/keyword", {
      params: { sort },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchNytArticlesByKeyword = async (sort = "newest") => {
  try {
    const response = await Axios.get("/news/naver/keyword", {
      params: { sort },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchArticleDetail = async (newsType, url) => {
  try {
    const response = await Axios.get(`/news/${newsType}`, {
      params: { url },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const likeArticle = async (articleData) => {
  try {
    const response = await Axios.post("/articles-like", {
      originalUrl: articleData.originalUrl,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteLikedArticle = async (articleId) => {
  try {
    const response = await Axios.delete(`/articles-like/${articleId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

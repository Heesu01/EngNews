import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import LeftBar from "../components/LeftBar";
import Article from "../components/Article";
import { fetchRelatedArticles } from "../api/NewsApi";

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return `${text.slice(0, maxLength)}...`;
  }
  return text;
};

const RelatedNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const extractNameFromPath = useCallback(() => {
    const match = location.pathname.match(/\/news\/([^/]+)/);
    return match ? match[1] : null;
  }, [location.pathname]);

  useEffect(() => {
    const fetchArticles = async () => {
      const url = new URLSearchParams(location.search).get("url");
      if (!url) {
        setError("URL이 제공되지 않았습니다.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetchRelatedArticles(url);
        setArticles(response.data.slice(0, 5));
      } catch (error) {
        setError(
          error.message || "관련 기사를 가져오는 중 문제가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [location]);

  const MAX_TITLE_LENGTH = 50;

  return (
    <Container>
      <LeftBar />
      <Article />
      <RightBar>
        <Header>
          <Title>관련 기사</Title>
        </Header>
        <Content>
          {loading ? (
            <p>관련 기사를 불러오는 중입니다...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : articles.length > 0 ? (
            <ArticleList>
              {articles.map((article, index) => {
                const name = extractNameFromPath();
                const articleUrl = encodeURIComponent(article.link);
                const articlePath = `/news/${name}?url=${articleUrl}`;
                return (
                  <li key={index}>
                    <img src={article.imageUrl} alt="기사 이미지" />
                    <p>{truncateText(article.title, MAX_TITLE_LENGTH)}</p>
                    <a href={articlePath}>상세 보기</a>
                  </li>
                );
              })}
            </ArticleList>
          ) : (
            <p>관련 기사가 없습니다.</p>
          )}
        </Content>
      </RightBar>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 40px;
  width: 100%;
  display: flex;
  gap: 10px;
`;

const RightBar = styled.div`
  width: 30%;
  padding: 20px 10px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const Content = styled.div`
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.5;
`;

const ArticleList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.theme.colors.lightGray};

    img {
      width: 100%;
      height: auto;
      border-radius: 5px;
    }

    p {
      margin: 5px 0;
      font-size: 14px;
      color: ${(props) => props.theme.colors.black};
    }

    a {
      margin-top: 5px;
      font-size: 14px;
      color: ${(props) => props.theme.colors.blue};
      text-decoration: none;
      margin-left: auto;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default RelatedNews;

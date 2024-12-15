import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import LeftBar from "../components/LeftBar";
import Article from "../components/Article";

const RelatedNews = () => {
  const [articles, setArticles] = useState([]);
  const location = useLocation();

  const extractNameFromPath = useCallback(() => {
    const match = location.pathname.match(/\/news\/([^/]+)/);
    return match ? match[1] : null;
  }, [location.pathname]);

  useEffect(() => {
    const fetchRelatedNews = async () => {
      const name = extractNameFromPath();
      if (!name) return;

      try {
        const response = await fetch(`/api/news/${name}/related-news`);
        const data = await response.json();

        setArticles(data.articles);
      } catch (error) {
        console.error("Failed to fetch related news:", error);
      }
    };

    fetchRelatedNews();
  }, [extractNameFromPath]);

  return (
    <Container>
      <LeftBar />
      <Article />
      <RightBar>
        <Header>
          <Title>관련 기사</Title>
        </Header>
        <Content>
          {articles.length > 0 ? (
            <ArticleList>
              {articles.map((article, index) => (
                <li key={index}>
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                </li>
              ))}
            </ArticleList>
          ) : (
            <p>관련 기사를 불러오는 중입니다...</p>
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
    min-height: 100px;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.theme.colors.lightGray};

    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: bold;
    }

    p {
      margin: 5px 0 0;
      font-size: 14px;
    }
  }
`;

export default RelatedNews;

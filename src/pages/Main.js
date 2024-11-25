import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Banner from "../components/Banner";
import { useNavigate } from "react-router-dom";
import { fetchNaverTop5News, fetchNytTop5News } from "../api/NewsApi";

const Main = () => {
  const navigate = useNavigate();
  const [naverArticles, setNaverArticles] = useState([]);
  const [nytArticles, setNytArticles] = useState([]);
  const [naverLoading, setNaverLoading] = useState(true);
  const [nytLoading, setNytLoading] = useState(true);

  useEffect(() => {
    const fetchNaverArticles = async () => {
      try {
        setNaverLoading(true);
        const response = await fetchNaverTop5News();
        setNaverArticles(response.data || []);
      } catch (error) {
        console.error("Error fetching Naver articles:", error);
      } finally {
        setNaverLoading(false);
      }
    };

    const fetchNytArticles = async () => {
      try {
        setNytLoading(true);
        const response = await fetchNytTop5News();
        setNytArticles(response.data || []);
      } catch (error) {
        console.error("Error fetching NYT articles:", error);
      } finally {
        setNytLoading(false);
      }
    };

    fetchNaverArticles();
    fetchNytArticles();
  }, []);

  const handleNaverArticleClick = (link) => {
    const encodedUrl = encodeURIComponent(link);
    navigate(`/news/naver?url=${encodedUrl}`);
  };

  const handleNytArticleClick = (link) => {
    const encodedUrl = encodeURIComponent(link);
    navigate(`/news/nyt?url=${encodedUrl}`);
  };

  return (
    <Container>
      <Banner />
      <BottomContainer>
        <CardContainer>
          <CardBox>
            <Title>
              네이버 TOP 5{" "}
              <span onClick={() => navigate("/naver")}>자세히보기 ></span>
            </Title>
            <CardWrapper>
              {naverLoading ? (
                <LoadingText>네이버 기사를 불러오는 중입니다...</LoadingText>
              ) : (
                naverArticles.map((article, index) => (
                  <Article
                    key={index}
                    // onClick={() => window.open(article.link, "_blank")}
                    onClick={() => handleNaverArticleClick(article.link)}
                  >
                    <Rank>{index + 1}</Rank>
                    <ImageWrapper>
                      <img src={article.imageUrl} alt={article.title} />
                    </ImageWrapper>
                    <ArticleTitle>{article.title}</ArticleTitle>
                  </Article>
                ))
              )}
            </CardWrapper>
          </CardBox>
          <CardBox>
            <Title>
              NY Times TOP 5{" "}
              <span onClick={() => navigate("/nyt")}>자세히보기 ></span>
            </Title>
            <CardWrapper>
              {nytLoading ? (
                <LoadingText>NY Times 기사를 불러오는 중입니다...</LoadingText>
              ) : (
                nytArticles.map((article, index) => (
                  <Article
                    key={index}
                    // onClick={() => window.open(article.link, "_blank")}
                    onClick={() => handleNytArticleClick(article.link)}
                  >
                    <Rank>{index + 1}</Rank>
                    <ImageWrapper>
                      <img src={article.imageUrl} alt={article.title} />
                    </ImageWrapper>
                    <ArticleTitle>{article.title}</ArticleTitle>
                  </Article>
                ))
              )}
            </CardWrapper>
          </CardBox>
        </CardContainer>
      </BottomContainer>
    </Container>
  );
};

const Container = styled.div``;

const BottomContainer = styled.div`
  padding: 50px 0;
  width: 90%;
  margin: auto;
`;
const CardContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 50px;
  justify-content: center;
`;
const CardBox = styled.div`
  width: 45%;
`;
const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 14px;
    font-weight: 400;
    color: ${(props) => props.theme.colors.gray};
    cursor: pointer;
    margin-top: 10px;
  }
`;
const CardWrapper = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid ${(props) => props.theme.colors.navy};
  border-radius: 5px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Article = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.blue};
  }
`;

const Rank = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-right: 15px;
  color: ${(props) => props.theme.colors.blue};
`;

const ImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin-right: 15px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const ArticleTitle = styled.div`
  font-size: 20px;
  flex: 1;
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 16px;
  color: ${(props) => props.theme.colors.gray};
`;

export default Main;

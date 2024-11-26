import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { AiFillSound } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { fetchArticleDetail, likeArticle } from "../api/NewsApi";

const Article = () => {
  const location = useLocation();
  const [articleData, setArticleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams(location.search);
        const url = params.get("url");
        const newsType = location.pathname.includes("nyt") ? "nyt" : "naver";

        const response = await fetchArticleDetail(newsType, url);

        setArticleData(response.data);
        setLiked(response.data.isArticleLike);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [location]);

  const handleLikeArticle = async () => {
    try {
      const params = new URLSearchParams(location.search);
      const originalUrl = params.get("url");

      if (!originalUrl) {
        alert("URL을 가져오지 못했습니다.");
        return;
      }

      await likeArticle({ originalUrl });

      setLiked(true);
      alert("기사 찜하기 성공!");
    } catch (err) {
      console.error("Error liking article:", err);
      alert("찜하기 실패. 다시 시도해주세요.");
    }
  };

  if (loading) {
    return <Loading>Loading article...</Loading>;
  }

  if (error) {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }

  return (
    <Container>
      <Top>
        <Date>{articleData.time || "시간 정보 없음"}</Date>
        <TitleBox>
          <Title>
            {articleData.title} <span>{articleData.journalistName}</span>
          </Title>
          <BtnBox>
            <Btn>
              <AiFillSound />
            </Btn>
            <Btn onClick={handleLikeArticle} disabled={liked}>
              <FaRegHeart />
              <p>{liked ? "찜 완료" : "기사 찜하기"}</p>
            </Btn>
          </BtnBox>
        </TitleBox>
      </Top>
      <ArticleBox>
        <Img alt="기사사진" src={articleData.imageUrl}></Img>
        <Content>{articleData.content}</Content>
      </ArticleBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 20px 10px;
`;

const Top = styled.div``;

const Date = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.gray};
  margin-bottom: 10px;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
  span {
    font-size: 13px;
    color: ${(props) => props.theme.colors.gray};
    margin-left: 10px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
`;

const Btn = styled.button`
  display: flex;
  height: 25px;
  align-items: center;
  justify-content: center;
  width: auto;
  padding: 6px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.lightBlue};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  p {
    margin-left: 5px;
  }
`;

const ArticleBox = styled.div`
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  min-height: 600px;
  height: auto;
  margin-top: 5px;
`;

const Img = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-bottom: 10px;
  object-fit: cover;
  width: 100%;
`;

const Content = styled.div``;

const Loading = styled.div`
  text-align: center;
  font-size: 16px;
  color: ${(props) => props.theme.colors.gray};
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: ${(props) => props.theme.colors.red};
`;

export default Article;

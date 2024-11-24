import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Banner from "../components/Banner";
import Category from "../components/Category";

const NaverNews = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSort, setSelectedSort] = useState("최신순");

  const categories = [
    "Top5",
    "키워드 맞춤",
    "정치",
    "IT/과학",
    "사회",
    "경제",
    "생활/문화",
    "세계",
  ];

  const articles = [
    { id: 1, title: "기사 제목 1", content: "간략한 내용 1" },
    { id: 2, title: "기사 제목 2", content: "간략한 내용 2" },
    { id: 3, title: "기사 제목 3", content: "간략한 내용 3" },
    { id: 4, title: "기사 제목 4", content: "간략한 내용 4" },
    { id: 4, title: "기사 제목 4", content: "간략한 내용 4" },
    { id: 4, title: "기사 제목 4", content: "간략한 내용 4" },
    { id: 4, title: "기사 제목 4", content: "간략한 내용 4" },
    { id: 4, title: "기사 제목 4", content: "간략한 내용 4" },
  ];

  const selectCategory = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleArticleClick = (articleId) => {
    navigate(`/news/newsId`);
  };

  return (
    <Container>
      <Banner />
      <BottomContainer>
        <SearchContainer>
          <InputWrapper>
            <SearchInput type="text" placeholder="기사를 검색해주세요." />
            <FaSearchIcon />
          </InputWrapper>
          <SortContainer>
            <SortOption
              selected={selectedSort === "최신순"}
              onClick={() => setSelectedSort("최신순")}
            >
              최신순
            </SortOption>
            <p>|</p>
            <SortOption
              selected={selectedSort === "인기순"}
              onClick={() => setSelectedSort("인기순")}
            >
              인기순
            </SortOption>
          </SortContainer>
        </SearchContainer>
        <FilterContainer>
          {categories.map((category, index) => (
            <Category
              key={index}
              label={category}
              selected={selectedCategory === category}
              onClick={() => selectCategory(category)}
            />
          ))}
        </FilterContainer>
        <ContentContainer>
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              onClick={() => handleArticleClick(article.id)}
            >
              <ArticleTitle>{article.title}</ArticleTitle>
              <ArticleContent>{article.content}</ArticleContent>
            </ArticleCard>
          ))}
        </ContentContainer>
      </BottomContainer>
    </Container>
  );
};

const Container = styled.div``;

const BottomContainer = styled.div`
  padding: 20px 50px;
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 20px auto;
  gap: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 6px;
  border: 1px solid ${(props) => props.theme.colors.gray2};
  border-radius: 20px;
  background-color: #fff;
`;

const SearchInput = styled.input`
  flex: 1;
  outline: none;
  padding-left: 10px;
  font-size: 16px;
`;

const FaSearchIcon = styled(FaSearch)`
  margin-right: 10px;
  color: ${(props) => props.theme.colors.navy};
  cursor: pointer;
`;

const SortContainer = styled.div`
  width: 120px;
  display: flex;
  gap: 10px;
  justify-content: center;
  p {
    color: ${(props) => props.theme.colors.gray};
  }
`;

const SortOption = styled.span`
  font-size: 14px;
  cursor: pointer;
  color: ${(props) =>
    props.selected ? props.theme.colors.black : props.theme.colors.gray};
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  &:hover {
    text-decoration: underline;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ContentContainer = styled.div`
  width: 100%;

  height: auto;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 1.5vw;
  flex-wrap: wrap;
`;

const ArticleCard = styled.div`
  width: 49%;
  min-height: 170px;
  border: 1px solid ${(props) => props.theme.colors.gray2};
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.white};
  cursor: pointer;
`;

const ArticleTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

const ArticleContent = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray};
`;

export default NaverNews;

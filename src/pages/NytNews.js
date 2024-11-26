import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { fetchNytCategories } from "../api/CategoryApi";
import {
  fetchNytTop5News,
  fetchNytArticlesByCategory,
  fetchNytArticlesByKeyword,
} from "../api/NewsApi";
import Banner from "../components/Banner";
import Category from "../components/Category";
import { useNavigate } from "react-router-dom";

const NytNews = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Top5");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchNytCategories();
        setCategories([
          { id: "top5", category: "Top5" },
          { id: "keyword", category: "키워드 맞춤" },
          ...response.data.categories,
        ]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchArticles = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);
      let response;

      if (selectedCategory === "Top5") {
        response = await fetchNytTop5News();
        setHasMore(false);
      } else if (selectedCategory === "키워드 맞춤") {
        response = await fetchNytArticlesByKeyword(selectedSort);
        setHasMore(response.data?.length > 0);
      } else {
        response = await fetchNytArticlesByCategory(
          selectedCategory,
          page,
          selectedSort
        );
        setHasMore(response.data?.length > 0);
      }

      setArticles((prev) =>
        page === 1 ? response.data : [...prev, ...response.data]
      );
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, page, selectedSort, loading]);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
  }, [selectedCategory, selectedSort]);

  useEffect(() => {
    fetchArticles();
  }, [page, fetchArticles]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        if (hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  const selectCategory = (category) => {
    setSelectedCategory(category);
  };

  const selectSortOption = (sortOption) => {
    setSelectedSort(sortOption);
  };

  const handleNytArticleClick = (link) => {
    const encodedUrl = encodeURIComponent(link);
    navigate(`/news/nyt?url=${encodedUrl}`);
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
              selected={selectedSort === "newest"}
              onClick={() => selectSortOption("newest")}
            >
              최신순
            </SortOption>
            <p>|</p>
            <SortOption
              selected={selectedSort === "relevance"}
              onClick={() => selectSortOption("relevance")}
            >
              정확도순
            </SortOption>
          </SortContainer>
        </SearchContainer>
        <FilterContainer>
          {categories.map((category, index) => (
            <Category
              key={index}
              label={category.category}
              selected={selectedCategory === category.category}
              onClick={() => selectCategory(category.category)}
            />
          ))}
        </FilterContainer>
        <ContentContainer>
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              onClick={() => handleNytArticleClick(article.link)}
            >
              <ArticleImage src={article.imageUrl} alt={article.title} />
              <ArticleTitle>{article.title}</ArticleTitle>
              <ArticleContent>
                {article.content
                  ? `${article.content.slice(0, 100)}...`
                  : "기사를 보려면 클릭하세요."}
              </ArticleContent>
            </ArticleCard>
          ))}
          {loading &&
            (selectedCategory !== "Top5" || articles.length === 0) && (
              <LoadingText>기사를 불러오는 중입니다...</LoadingText>
            )}
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
  width: 140px;
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
  min-height: 230px;
  border: 1px solid ${(props) => props.theme.colors.gray2};
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.white};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ArticleImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
`;

const ArticleTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

const ArticleContent = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray};
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 16px;
  color: ${(props) => props.theme.colors.gray};
`;

export default NytNews;

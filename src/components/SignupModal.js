import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import Category from "./Category";
import { BiSolidCategory } from "react-icons/bi";
import { BsBookmarkPlusFill, BsChevronDown } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  fetchNaverCategories,
  fetchNytCategories,
  fetchKeywords,
} from "../api/CategoryApi";

const SignUpModal = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [availableKeywords, setAvailableKeywords] = useState([]);
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showKeywordList, setShowKeywordList] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const [naverResponse, nytResponse] = await Promise.all([
          fetchNaverCategories(),
          fetchNytCategories(),
        ]);
        const combinedCategories = [
          ...naverResponse.data.categories.map((item) => ({
            id: item.id,
            category: item.category,
            source: "Naver",
          })),
          ...nytResponse.data.categories.map((item) => ({
            id: item.id,
            category: item.category,
            source: "NYT",
          })),
        ];
        setCategories(combinedCategories);
      } catch (error) {
        console.error("카테고리 조회 실패:", error);
      }
    };

    loadCategories();
  }, []);

  const loadKeywords = async (category) => {
    try {
      setActiveCategory(category);
      const response = await fetchKeywords(category.id);
      const keywordList = response.data.keywords.map((item) => ({
        id: item.keywordId,
        name: item.keywordName,
        categoryId: item.categoryId,
      }));
      setAvailableKeywords(keywordList);
    } catch (error) {
      console.error("키워드 조회 실패:", error);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategories((prev) =>
      prev.some((item) => item.id === category.id) ? prev : [...prev, category]
    );
    loadKeywords(category);
    setShowCategoryList(false);
  };

  const removeCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.filter((item) => item.id !== category.id)
    );
    if (activeCategory && activeCategory.id === category.id) {
      setActiveCategory(null);
      setAvailableKeywords([]);
    }
  };

  const addKeyword = (keyword) => {
    if (!keywords.some((k) => k.id === keyword.id)) {
      setKeywords([...keywords, keyword]);
    }
    setShowKeywordList(false);
  };

  const removeKeyword = (keyword) => {
    setKeywords(keywords.filter((item) => item.id !== keyword.id));
  };

  const handleComplete = () => {
    console.log("Selected Categories:", selectedCategories);
    console.log("Selected Keywords:", keywords);
    navigate("/");
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <CategoryContainer>
          <CategoryTitle>
            <BiSolidCategory />
            <p>관심 카테고리 선택</p>
          </CategoryTitle>
          <Dropdown onClick={() => setShowCategoryList((prev) => !prev)}>
            <span>카테고리를 선택해주세요</span>
            <BsChevronDown />
          </Dropdown>
          {showCategoryList && (
            <DropdownList>
              {categories.map((category) => (
                <DropdownItem
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category.category} ({category.source})
                </DropdownItem>
              ))}
            </DropdownList>
          )}
          <AddedContainer>
            {selectedCategories.map((category) => (
              <Category
                key={category.id}
                label={`${category.category} (${category.source})`}
                selected={true}
                onClick={() => removeCategory(category)}
              />
            ))}
          </AddedContainer>
        </CategoryContainer>
        <KeywordContainer>
          <CategoryTitle>
            <BsBookmarkPlusFill size={"16px"} />
            <p>관심 키워드 선택</p>
          </CategoryTitle>
          {activeCategory && (
            <ActiveCategory>
              {activeCategory.category} ({activeCategory.source})
            </ActiveCategory>
          )}
          <Dropdown onClick={() => setShowKeywordList((prev) => !prev)}>
            <span>키워드를 선택해주세요</span>
            <BsChevronDown />
          </Dropdown>
          {showKeywordList && (
            <DropdownList>
              {availableKeywords.map((keyword) => (
                <DropdownItem
                  key={keyword.id}
                  onClick={() => addKeyword(keyword)}
                >
                  {keyword.name}
                </DropdownItem>
              ))}
            </DropdownList>
          )}
          <AddedContainer>
            {keywords.map((keyword) => (
              <Category
                key={keyword.id}
                label={keyword.name}
                selected={false}
                onClick={() => removeKeyword(keyword)}
              />
            ))}
          </AddedContainer>
        </KeywordContainer>
        <Button onClick={handleComplete}>완료</Button>
      </ModalContainer>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  width: 50%;
  height: auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CategoryTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  margin-bottom: 10px;
  p {
    margin-left: 10px;
  }
`;

const CategoryContainer = styled.div`
  position: relative;
`;

const KeywordContainer = styled.div``;

const Dropdown = styled.div`
  width: 100%;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.gray2};
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    border-color: ${(props) => props.theme.colors.gray3};
  }
`;

const DropdownList = styled.div`
  background: white;
  border: 1px solid ${(props) => props.theme.colors.gray2};
  border-radius: 4px;
  margin-top: 5px;
  max-height: 150px;
  overflow-y: auto;
  position: relative;
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.colors.gray3};
  }
`;

const ActiveCategory = styled.div`
  background-color: ${(props) => props.theme.colors.lightBlue};
  color: ${(props) => props.theme.colors.black};
  padding: 5px 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  text-align: center;
`;

const AddedContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

export default SignUpModal;

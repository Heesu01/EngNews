import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import Category from "./Category";
import { BiSolidCategory } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  fetchNaverCategories,
  fetchNytCategories,
  createCategory,
  fetchCategoryKeywords,
  createKeyword,
} from "../api/CategoryApi";

const SignUpModal = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [keywordOptions, setKeywordOptions] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [isKeywordStep, setIsKeywordStep] = useState(false);
  const [showKeywordList, setShowKeywordList] = useState({});

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

  const handleCategorySelect = (category) => {
    setSelectedCategories((prev) =>
      prev.some((item) => item.id === category.id) ? prev : [...prev, category]
    );
  };

  const removeCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.filter((item) => item.id !== category.id)
    );
  };

  const fetchKeywordOptions = async () => {
    try {
      await Promise.all(
        selectedCategories.map((category) =>
          createCategory({
            categoryId: category.id,
            category: category.category,
          })
        )
      );
      const data = await fetchCategoryKeywords();
      setKeywordOptions(data);
      setIsKeywordStep(true);
    } catch (error) {
      console.error("카테고리 POST 또는 키워드 조회 실패:", error);
    }
  };

  const toggleKeywordList = (categoryId) => {
    setShowKeywordList((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleKeywordSelect = (categoryId, keyword) => {
    setSelectedKeywords((prev) => {
      const existingCategory = prev.find(
        (item) => item.categoryId === categoryId
      );
      if (existingCategory) {
        return prev.map((item) =>
          item.categoryId === categoryId
            ? {
                ...item,
                keywords: item.keywords.some(
                  (k) => k.keywordOptionId === keyword.keywordOptionId
                )
                  ? item.keywords
                  : [...item.keywords, keyword],
              }
            : item
        );
      } else {
        return [...prev, { categoryId, keywords: [keyword] }];
      }
    });
  };

  const removeKeyword = (categoryId, keyword) => {
    setSelectedKeywords((prev) => {
      const existingCategory = prev.find(
        (item) => item.categoryId === categoryId
      );
      if (!existingCategory) return prev;

      const updatedKeywords = existingCategory.keywords.filter(
        (k) => k.keywordOptionId !== keyword.keywordOptionId
      );

      if (updatedKeywords.length > 0) {
        return prev.map((item) =>
          item.categoryId === categoryId
            ? { ...item, keywords: updatedKeywords }
            : item
        );
      } else {
        return prev.filter((item) => item.categoryId !== categoryId);
      }
    });
  };

  const handleComplete = async () => {
    try {
      await Promise.all(
        selectedKeywords.flatMap((category) =>
          category.keywords.map((keyword) =>
            createKeyword({
              categoryId: category.categoryId,
              keywordId: keyword.keywordOptionId,
            })
          )
        )
      );
      console.log("Keywords successfully posted:", selectedKeywords);
      navigate("/");
    } catch (error) {
      console.error("키워드 POST 실패:", error);
    }
  };

  return (
    <ModalBackground>
      <ModalContainer>
        {!isKeywordStep ? (
          <>
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
            <Button onClick={fetchKeywordOptions}>다음</Button>
          </>
        ) : (
          <>
            <CategoryContainer>
              <CategoryTitle>
                <p>키워드 선택</p>
              </CategoryTitle>
              {keywordOptions.map((category) => (
                <KeywordListContainer key={category.categoryId}>
                  <Dropdown
                    onClick={() => toggleKeywordList(category.categoryId)}
                  >
                    <span>{category.category} 키워드 선택</span>
                    <BsChevronDown />
                  </Dropdown>
                  {showKeywordList[category.categoryId] && (
                    <DropdownList>
                      {category.keywordOptions.map((keyword) => (
                        <DropdownItem
                          key={keyword.keywordOptionId}
                          onClick={() =>
                            handleKeywordSelect(category.categoryId, keyword)
                          }
                        >
                          {keyword.keywordName}
                        </DropdownItem>
                      ))}
                    </DropdownList>
                  )}
                </KeywordListContainer>
              ))}
              <AddedContainer>
                {selectedKeywords.map((category) => (
                  <div key={category.categoryId}>
                    <h4>
                      {
                        keywordOptions.find(
                          (c) => c.categoryId === category.categoryId
                        )?.category
                      }
                    </h4>
                    <KeywordBox>
                      {category.keywords.map((keyword) => (
                        <Category
                          key={keyword.keywordOptionId}
                          label={keyword.keywordName}
                          selected={true}
                          onClick={() =>
                            removeKeyword(category.categoryId, keyword)
                          }
                        />
                      ))}
                    </KeywordBox>
                  </div>
                ))}
              </AddedContainer>
            </CategoryContainer>
            <Button onClick={handleComplete}>완료</Button>
          </>
        )}
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

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.colors.gray3};
  }
`;

const AddedContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const KeywordListContainer = styled.div`
  padding: 5px;
  margin-bottom: 10px;
`;

const DropdownList = styled.div`
  background: white;
  border: 1px solid ${(props) => props.theme.colors.gray2};
  border-radius: 4px;
  margin-top: 5px;
  max-height: 150px;
  overflow-y: auto;
  padding: 5px;
`;

const KeywordBox = styled.div`
  display: flex;
  gap: 5px;
`;

export default SignUpModal;

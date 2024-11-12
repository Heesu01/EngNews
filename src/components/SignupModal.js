import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Category from "./Category";
import { BiSolidCategory } from "react-icons/bi";
import { BsBookmarkPlusFill, BsChevronDown } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SignUpModal = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [showKeywordList, setShowKeywordList] = useState(false);

  const categories = ["정치", "IT/과학", "사회", "경제", "생활/문화", "세계"];
  const availableKeywords = [
    "개발자",
    "데이터",
    "AI",
    "코딩",
    "웹개발",
    "앱개발",
  ];

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleKeywordList = () => {
    setShowKeywordList((prev) => !prev);
  };

  const addKeyword = (keyword) => {
    if (!keywords.includes(keyword)) {
      setKeywords([...keywords, keyword]);
    }
    setShowKeywordList(false);
  };

  const removeKeyword = (keyword) => {
    setKeywords(keywords.filter((item) => item !== keyword));
  };

  const handleComplete = () => {
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
          {categories.map((category, index) => (
            <Category
              key={index}
              label={category}
              selected={selectedCategories.includes(category)}
              onClick={() => toggleCategory(category)}
            />
          ))}
        </CategoryContainer>
        <KeywordContainer>
          <CategoryTitle>
            <BsBookmarkPlusFill size={"16px"} />
            <p>관심 키워드 선택</p>
          </CategoryTitle>
          <KeywordDropdown onClick={toggleKeywordList}>
            <span>관심 키워드를 선택해주세요</span>
            <BsChevronDown />
          </KeywordDropdown>
          {showKeywordList && (
            <DropdownList>
              {availableKeywords.map((keyword, index) => (
                <DropdownItem key={index} onClick={() => addKeyword(keyword)}>
                  {keyword}
                </DropdownItem>
              ))}
            </DropdownList>
          )}
          <AddedKeywordContainer>
            {keywords.map((keyword, index) => (
              <Category
                key={index}
                label={keyword}
                selected={false}
                onClick={() => removeKeyword(keyword)}
              />
            ))}
          </AddedKeywordContainer>
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
  background-color: #fff;
  border-radius: 8px;
  width: 50%;
  height: auto;
  padding: 30px 30px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const CategoryTitle = styled.h3`
  width: 100%;
  font-size: 1.2rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  p {
    margin-left: 5px;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const KeywordContainer = styled.div`
  margin-bottom: 20px;
`;

const KeywordDropdown = styled.div`
  width: 100%;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.colors.navy};
  border-radius: 4px;
  cursor: pointer;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    border: 1.5px solid ${(props) => props.theme.colors.deepBlue};
  }
`;

const DropdownList = styled.div`
  position: relative;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const AddedKeywordContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export default SignUpModal;

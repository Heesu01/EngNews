import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Category from "./Category";
import { BiSolidCategory } from "react-icons/bi";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SignUpModal = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [inputKeyword, setInputKeyword] = useState("");

  const categories = ["정치", "IT/과학", "사회", "경제", "생활/문화", "세계"];

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const addKeyword = () => {
    if (inputKeyword && !keywords.includes(inputKeyword)) {
      setKeywords([...keywords, inputKeyword]);
      setInputKeyword("");
    }
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
            <p>관심 키워드 추가</p>
          </CategoryTitle>
          <KeywordInput
            type="text"
            placeholder="키워드를 입력해주세요."
            value={inputKeyword}
            onChange={(e) => setInputKeyword(e.target.value)}
          />
          <KeywordButton onClick={addKeyword}>+</KeywordButton>
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

const KeywordInput = styled.input`
  width: 90%;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.colors.navy};
  border-radius: 4px;
  margin-right: 8px;
  &:focus {
    outline: none;
    border: 1.5px solid ${(props) => props.theme.colors.deepBlue};
  }
`;

const KeywordButton = styled.button`
  padding: 10px;
  border: none;
  background-color: #1c3a7a;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
`;

const AddedKeywordContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export default SignUpModal;

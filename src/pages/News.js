import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

import Banner from "../components/Banner";

const News = () => {
  const [selectedSort, setSelectedSort] = useState("최신순");

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

export default News;

import React from "react";
import LeftBar from "../components/LeftBar";
import styled from "styled-components";
import Article from "../components/Article";

const NewsDetail = () => {
  return (
    <Container>
      <LeftBar />
      <Article />
    </Container>
  );
};
const Container = styled.div`
  padding: 20px 40px;
  width: 100%;
  display: flex;
`;

export default NewsDetail;

import React, { useState } from "react";
import styled from "styled-components";
import LeftBar from "../components/LeftBar";
import Article from "../components/Article";

const Analyze = () => {
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <Container>
      <LeftBar />
      <Article onAnalyze={setAnalysisResult} />
      <RightBar>
        <Content>
          <Title>구문 분석 결과</Title>
          <AnalysisResult>
            {analysisResult ? (
              <p>{analysisResult}</p>
            ) : (
              <p>구문을 드래그하면 결과가 여기에 표시됩니다.</p>
            )}
          </AnalysisResult>
        </Content>
      </RightBar>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 40px;
  width: 100%;
  display: flex;
  gap: 10px;
`;

const RightBar = styled.div`
  width: 30%;
  padding: 20px 10px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.navy};
`;

const AnalysisResult = styled.div`
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.lightGray};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default Analyze;

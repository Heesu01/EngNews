import React from "react";
import styled from "styled-components";
import { FaRegNewspaper, FaTools } from "react-icons/fa";
import { MdAssistant } from "react-icons/md";

const Banner = () => {
  return (
    <Container>
      <Content>
        <Title>산업 맞춤형 영어 학습 서비스</Title>
        {/* <Subtitle>영어 실력 향상과 최신 트렌드를 한 곳에서!</Subtitle> */}
        <Subtitle>ENGNEWS와 함께 영어 실력과 트렌드를 동시에!</Subtitle>
        <Description>
          {/* ENGNEWS는 산업 실무자들을 위한 맞춤형 영어 학습 플랫폼으로,
          <br />
          실시간 산업 뉴스 제공, 전문 어휘 피드백, 번역 연습 등 업무와 학습을
          효율적으로 병행할 수 있도록 지원합니다. */}
        </Description>
        <FeatureList>
          <li>
            <Icon>
              <FaRegNewspaper />
            </Icon>
            <Text>
              <strong>맞춤형 뉴스 제공</strong> - 실시간 산업 트렌드 파악
            </Text>
          </li>
          <li>
            <Icon>
              <FaTools />
            </Icon>
            <Text>
              <strong>번역/요약해보기 연습</strong> - 자연스러운 번역 훈련
            </Text>
          </li>
          <li>
            <Icon>
              <MdAssistant />
            </Icon>
            <Text>
              <strong>AI 피드백</strong> - 어휘와 문법 보완
            </Text>
          </li>
        </FeatureList>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 30px 40px;
  background: ${(props) => props.theme.colors.navy};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  max-width: 1000px;
  width: 100%;
  text-align: left;
  color: ${(props) => props.theme.colors.white};
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 15px;
`;

const Description = styled.p`
  font-size: 15px;
  margin-bottom: 25px;
  color: ${(props) => props.theme.colors.lightGray};
`;

const FeatureList = styled.ul`
  font-size: 15px;
  color: ${(props) => props.theme.colors.white};

  li {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
`;

const Icon = styled.div`
  font-size: 22px;
  margin-right: 10px;
  display: flex;
`;

const Text = styled.div`
  font-size: 14px;
`;

export default Banner;

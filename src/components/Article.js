import React from "react";
import styled from "styled-components";
import { AiFillSound } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";

const Article = () => {
  return (
    <Container>
      <Top>
        <Date>2021.05.19</Date>
        <TitleBox>
          <Title>
            기사제목 <span>기자이름</span>
          </Title>
          <BtnBox>
            <Btn>
              <AiFillSound />
            </Btn>
            <Btn>
              <FaRegHeart />
              <p>기사 찜하기</p>
            </Btn>
          </BtnBox>
        </TitleBox>
      </Top>
      <ArticleBox>
        <Img alt="기사사진" src=""></Img>
        <Content>
          현대 정보화 사회에서 외국어로 된 정보와 콘텐츠를 읽는 일은 우리의
          일상적인 업무와 학습의 중요한 부분으로 자리 잡았다. 특히, 영어와 같은
          외국어를 공부하거나 활용하는 과정에서 번역 도구의 도움을 받는 경우가
          늘어나고 있다. 영어로 된 글을 읽다 보면 낯선 단어나 문장을 이해하기
          어려운 경우가 자주 발생하기 때문이다.이러한 문제를 해결하기 위해
          다양한 번역 도구가 등장했고, 그 중에서도 최근 주목받고 있는 ‘몰입형
          번역’은 사용자들 사이에서 소셜미디어를 통해 입소문을 타며 인기를 끌고
          있다.크롬 웹 스토어 등 앱 스토어에서 수백만 건 이상의 높은 다운로드
          수를 기록하며, 번역 도구 중에서도 상위권에 자리하고 있는 '몰입형
          번역'은 공식 설명에 따르면 웹 페이지를 이중 언어로 대조하며 번역할 수
          있는 확장 프로그램이다.PDF 문서 번역 시 원본 레이아웃을 그대로 유지할
          수 있을 뿐만 아니라 유튜브, 넷플릭스 등 동영상의 자막을 이중 언어로
          제공하는 기능도 갖추고 있고, EPUB 전자책 번역, 만화 번역까지 지원한다.
          또한, 다양한 번역 엔진을 내장해 사용자가 원하는 번역 스타일을 선택할
          수 있으며, AI 번역 대모델인 GPT-4, Claude, Gemini 등의 최신 기술을
          지원하여 더욱 정교한 번역 결과를 얻을 수 있다.
        </Content>
      </ArticleBox>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 20px 10px;
`;
const Top = styled.div``;
const Date = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.gray};
`;
const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
  span {
    font-size: 13px;
    color: ${(props) => props.theme.colors.gray};
  }
`;
const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const Btn = styled.button`
  display: flex;
  height: 25px;
  align-items: center;
  justify-content: center;
  width: auto;
  padding: 6px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.lightBlue};
  p {
    margin-left: 5px;
  }
`;
const ArticleBox = styled.div`
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  min-height: 600px;
  height: auto;
  margin-top: 5px;
`;
const Img = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-bottom: 10px;
`;
const Content = styled.div``;

export default Article;

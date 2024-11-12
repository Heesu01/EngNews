import styled from "styled-components";
import Banner from "../components/Banner";

const Main = () => {
  const naverArticles = [
    { id: 1, title: "네이버 기사 1" },
    { id: 2, title: "네이버 기사 2" },
    { id: 3, title: "네이버 기사 3" },
    { id: 4, title: "네이버 기사 4" },
    { id: 5, title: "네이버 기사 5" },
  ];

  const nyTimesArticles = [
    { id: 1, title: "NY Times 기사 1" },
    { id: 2, title: "NY Times 기사 2" },
    { id: 3, title: "NY Times 기사 3" },
    { id: 4, title: "NY Times 기사 4" },
    { id: 5, title: "NY Times 기사 5" },
  ];

  return (
    <Container>
      <Banner />
      <BottomContainer>
        <CardContainer>
          <CardBox>
            <Title>
              네이버 TOP 5 <span>자세히보기 ></span>
            </Title>
            <CardWrapper>
              {naverArticles.map((article, index) => (
                <Article key={article.id}>
                  <Rank>{index + 1}</Rank>
                  <ArticleTitle>{article.title}</ArticleTitle>
                </Article>
              ))}
            </CardWrapper>
          </CardBox>
          <CardBox>
            <Title>
              NY Times TOP 5 <span>자세히보기 ></span>
            </Title>
            <CardWrapper>
              {nyTimesArticles.map((article, index) => (
                <Article key={article.id}>
                  <Rank>{index + 1}</Rank>
                  <ArticleTitle>{article.title}</ArticleTitle>
                </Article>
              ))}
            </CardWrapper>
          </CardBox>
        </CardContainer>
      </BottomContainer>
    </Container>
  );
};

const Container = styled.div``;
const BottomContainer = styled.div`
  padding: 50px 0;
  width: 90%;
  margin: auto;
`;
const CardContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 50px;
  justify-content: center;
`;
const CardBox = styled.div`
  width: 45%;
`;
const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 14px;
    font-weight: 400;
    color: ${(props) => props.theme.colors.gray};
    cursor: pointer;
    margin-top: 10px;
  }
`;
const CardWrapper = styled.div`
  width: 100%;
  height: 500px;
  border: 1px solid ${(props) => props.theme.colors.navy};
  border-radius: 5px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Article = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Rank = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-right: 15px;
  color: ${(props) => props.theme.colors.blue};
`;

const ArticleTitle = styled.div`
  font-size: 20px;
`;

export default Main;

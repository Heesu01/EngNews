import styled from "styled-components";

import Banner from "../components/Banner";

const Main = () => {
  return (
    <Container>
      <Banner />
      <BottomContainer>
        <CardContainer>
          <CardBox>
            <Title>
              네이버 TOP 5 <span>자세히보기 ></span>
            </Title>
            <Card></Card>
          </CardBox>
          <CardBox>
            <Title>
              NY Times TOP 5 <span>자세히보기 ></span>
            </Title>
            <Card></Card>
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
  width: 50%;
`;
const Title = styled.div`
  font-size: 20px;
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
const Card = styled.div`
  width: 100%;
  height: 500px;
  border: 1px solid ${(props) => props.theme.colors.navy};
  border-radius: 5px;
`;
export default Main;

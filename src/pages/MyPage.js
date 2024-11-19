import React from "react";
import styled from "styled-components";

const MyPage = () => {
  return (
    <Container>
      <Sidebar>
        <Profile>
          <ProfileImage />
          <UserName>사용자 이름</UserName>
        </Profile>
        <Category>
          <Title>관심 카테고리</Title>
          <Buttons>
            <Button>경제</Button>
            <Button>생활</Button>
          </Buttons>
        </Category>
        <Keywords>
          <Title>관심 키워드</Title>
          <Buttons>
            <Button>주식</Button>
            <Button>개발</Button>
          </Buttons>
        </Keywords>
        <RecentArticles>
          <Title>최근 본 기사</Title>
          <ul>
            <li>000000</li>
            <li>000000</li>
            <li>000000</li>
          </ul>
        </RecentArticles>
        <Actions>
          <ActionButton>수정</ActionButton>
          <ActionButton secondary>회원탈퇴</ActionButton>
        </Actions>
      </Sidebar>
      <Main>
        <FavoriteArticles>
          <SectionTitle>
            찜 기사 목록<span>더보기 ></span>
          </SectionTitle>
          <ArticleGrid>
            {Array.from({ length: 6 }).map((_, idx) => (
              <ArticleCard key={idx}>
                <ImagePlaceholder>기사 사진</ImagePlaceholder>
                <ArticleTitle>찜한 기사 제목 - {idx + 1}</ArticleTitle>
              </ArticleCard>
            ))}
          </ArticleGrid>
        </FavoriteArticles>
        <WordList>
          <SectionTitle>나만의 단어장</SectionTitle>
          <WordGrid>
            {Array.from({ length: 12 }).map((_, idx) => (
              <WordCard key={idx}>
                <Word>again</Word>
                <Translation>다시</Translation>
              </WordCard>
            ))}
          </WordGrid>
        </WordList>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background-color: #f8f9fa;
  padding: 40px 20px;
  height: 700px;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  min-width: 200px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  margin-right: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  background-color: #dcdcdc;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Category = styled.div``;

const Keywords = styled.div``;

const RecentArticles = styled.div`
  margin: 20px 0;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: auto;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.navy};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
`;

const ActionButton = styled(Button)`
  background-color: ${({ secondary }) => (secondary ? "#f44336" : "#4caf50")};

  &:hover {
    background-color: ${({ secondary }) => (secondary ? "#e53935" : "#45a049")};
  }
`;

const Main = styled.div`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 7px 9px rgba(0, 0, 0, 0.1);
`;

const FavoriteArticles = styled.div`
  margin-bottom: 2.5vw;
`;

const WordList = styled.div`
  margin-top: 40px;
`;

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  span {
    font-weight: 300;
    font-size: 15px;
    color: ${(props) => props.theme.colors.gray};
    cursor: pointer;
  }
`;

const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const ArticleCard = styled.div`
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ImagePlaceholder = styled.div`
  background-color: ${(props) => props.theme.colors.gray2};
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const ArticleTitle = styled.div`
  font-size: 14px;
`;

const WordGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
`;

const WordCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.lightBlue};
  border-radius: 10px;
  padding: 10px 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Word = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const Translation = styled.div`
  width: 75px;
  text-align: center;
  font-size: 14px;
  background-color: ${(props) => props.theme.colors.white};
  padding: 5px 10px;
  border-radius: 5px;
`;

export default MyPage;

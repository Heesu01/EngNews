import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import { VscSymbolKeyword } from "react-icons/vsc";
import { FaUserCircle } from "react-icons/fa";
import { userApi } from "../api/UserApi";
import {
  createCategory,
  deleteCategory,
  createKeyword,
  deleteKeyword,
  fetchNaverCategories,
  fetchNytCategories,
  fetchKeywords,
} from "../api/CategoryApi";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [likedWords, setLikedWords] = useState([]);
  const [naverArticles, setNaverArticles] = useState([]);
  const [nytArticles, setNytArticles] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [loadingWords, setLoadingWords] = useState(true);
  const [loadingArticles, setLoadingArticles] = useState(true);

  const [availableCategories, setAvailableCategories] = useState([]);
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingWords(true);
        setLoadingArticles(true);

        const userResponse = await userApi.getUserDetails();
        setUserData(
          userResponse.data || { name: "", categories: [], keywords: [] }
        );

        const wordsResponse = await userApi.getLikedWords();
        setLikedWords(wordsResponse.data.wordLikeList || []);
        setLoadingWords(false);
        const [naverResponse, nytResponse] = await Promise.all([
          userApi.getLikedNaverArticles(),
          userApi.getLikedNytArticles(),
        ]);
        setNaverArticles(naverResponse.data.articleLikes || []);
        setNytArticles(nytResponse.data.articleLikes || []);
        setLoadingArticles(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingWords(false);
        setLoadingArticles(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      const fetchAvailableData = async () => {
        try {
          const [naverResponse, nytResponse] = await Promise.all([
            fetchNaverCategories(),
            fetchNytCategories(),
          ]);

          const combinedCategories = [
            ...naverResponse.data.categories,
            ...nytResponse.data.categories,
          ];
          const uniqueCategories = Array.from(
            new Map(combinedCategories.map((item) => [item.id, item])).values()
          );

          setAvailableCategories(uniqueCategories);
        } catch (error) {
          console.error("Error fetching available categories:", error);
          setAvailableCategories([]);
        }
      };

      fetchAvailableData();
    }
  }, [isEditMode]);

  const handleCategorySelect = async (categoryId) => {
    setSelectedCategoryId(categoryId);
    try {
      const response = await fetchKeywords(categoryId);
      setKeywords(response.keywords || []);
    } catch (error) {
      console.error("Error fetching keywords:", error);
      setKeywords([]);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryId) return;

    try {
      const selectedCategory = availableCategories.find(
        (category) => category.id === newCategoryId
      );

      if (!selectedCategory) {
        console.error("Category not found in available categories.");
        return;
      }

      const categoryData = {
        categoryId: selectedCategory.id,
        category: selectedCategory.category,
      };

      const response = await createCategory(categoryData);

      setUserData((prev) => ({
        ...prev,
        categories: [...prev.categories, { ...categoryData, id: response.id }],
      }));

      setAvailableCategories((prev) =>
        prev.filter((category) => category.id !== newCategoryId)
      );

      setNewCategoryId("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setUserData((prev) => ({
        ...prev,
        categories: prev.categories.filter(
          (category) => category.id !== categoryId
        ),
      }));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleAddKeyword = async () => {
    if (!newKeyword || !selectedCategoryId) return;
    try {
      const response = await createKeyword({
        categoryId: selectedCategoryId,
        keyword: newKeyword,
      });
      setKeywords((prev) => [...prev, response]);
      setNewKeyword("");
    } catch (error) {
      console.error("Error adding keyword:", error);
    }
  };

  const handleDeleteKeyword = async (keywordId) => {
    try {
      await deleteKeyword(keywordId);
      setKeywords((prev) => prev.filter((keyword) => keyword.id !== keywordId));
    } catch (error) {
      console.error("Error deleting keyword:", error);
    }
  };

  if (!userData || !userData.categories || !userData.keywords) {
    return <div>Loading...</div>;
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setPassword("");
  };

  const handleDeleteUser = async () => {
    if (!password.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (window.confirm("정말로 회원탈퇴 하시겠습니까?")) {
      try {
        await userApi.deleteUser({ password });
        alert("회원탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");
        navigate("/");
      } catch (error) {
        console.error("회원탈퇴 실패:", error);
        alert("회원탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.");
      } finally {
        handleClosePasswordModal();
      }
    }
  };

  const handleArticleClick = (url, type) => {
    const encodedUrl = encodeURIComponent(url);
    navigate(`/news/${type}?url=${encodedUrl}`);
  };

  const handleDeleteLikedWord = async (wordId) => {
    try {
      await userApi.deleteLikedWord(wordId);
      setLikedWords((prev) => prev.filter((word) => word.id !== wordId));
    } catch (error) {
      console.error("Error deleting liked word:", error);
    }
  };

  return (
    <Container>
      <Sidebar>
        <Profile>
          <ProfileImage />
          <UserName>{userData.name}</UserName>
        </Profile>
        <Category>
          <Title>관심 카테고리</Title>
          <Buttons>
            {userData.categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
              >
                {category.category}
                {isEditMode && (
                  <DeleteButton
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    ❌
                  </DeleteButton>
                )}
              </Button>
            ))}
            {isEditMode && (
              <>
                <Select
                  value={newCategoryId}
                  onChange={(e) => setNewCategoryId(e.target.value)}
                >
                  <option value="">카테고리 선택</option>
                  {availableCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category}
                    </option>
                  ))}
                </Select>
                <ActionButton onClick={handleAddCategory}>추가</ActionButton>
              </>
            )}
          </Buttons>
        </Category>
        <Keywords>
          <Title>관심 키워드</Title>
          <Buttons>
            {keywords.map((keyword) => (
              <Button key={keyword.id}>
                {keyword.keyword}
                {isEditMode && (
                  <DeleteButton onClick={() => handleDeleteKeyword(keyword.id)}>
                    ❌
                  </DeleteButton>
                )}
              </Button>
            ))}
          </Buttons>
          {isEditMode && (
            <>
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="키워드 추가"
              />
              <ActionButton onClick={handleAddKeyword}>추가</ActionButton>
            </>
          )}
        </Keywords>
        <Actions>
          <ActionButton secondary onClick={handleOpenPasswordModal}>
            회원탈퇴
          </ActionButton>
          <ActionButton onClick={() => setIsEditMode(!isEditMode)}>
            {isEditMode ? "완료" : "수정"}
          </ActionButton>
        </Actions>
      </Sidebar>
      {isPasswordModalOpen && (
        <Modal>
          <ModalContent>
            <ModalTitle>회원탈퇴</ModalTitle>
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={handlePasswordChange}
            />
            <ModalActions>
              <ActionButton secondary onClick={handleClosePasswordModal}>
                취소
              </ActionButton>
              <ActionButton onClick={handleDeleteUser}>확인</ActionButton>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
      <Main>
        <Articles>
          <FavoriteArticles>
            <SectionTitle>
              <FaHeart /> 네이버 찜 기사
            </SectionTitle>
            {loadingArticles ? (
              <LoadingMessage>
                네이버 기사를 불러오는 중입니다...
              </LoadingMessage>
            ) : (
              <ArticleGrid>
                {naverArticles.length > 0 ? (
                  naverArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      onClick={() =>
                        handleArticleClick(article.originalUrl, "naver")
                      }
                    >
                      <ImagePlaceholder>
                        <img src={article.imageUrl} alt={article.title} />
                      </ImagePlaceholder>
                      <ArticleTitle>{article.title}</ArticleTitle>
                    </ArticleCard>
                  ))
                ) : (
                  <EmptyMessage>네이버 찜한 기사가 없습니다.</EmptyMessage>
                )}
              </ArticleGrid>
            )}
          </FavoriteArticles>
          <FavoriteArticles>
            <SectionTitle>
              <FaHeart /> NYT 찜 기사
            </SectionTitle>
            {loadingArticles ? (
              <LoadingMessage>NYT 기사를 불러오는 중입니다...</LoadingMessage>
            ) : (
              <ArticleGrid>
                {nytArticles.length > 0 ? (
                  nytArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      onClick={() =>
                        handleArticleClick(article.originalUrl, "nyt")
                      }
                    >
                      <ImagePlaceholder>
                        <img src={article.imageUrl} alt={article.title} />
                      </ImagePlaceholder>
                      <ArticleTitle>{article.title}</ArticleTitle>
                    </ArticleCard>
                  ))
                ) : (
                  <EmptyMessage>NYT 찜한 기사가 없습니다.</EmptyMessage>
                )}
              </ArticleGrid>
            )}
          </FavoriteArticles>
        </Articles>
        <WordList>
          <SectionTitle>
            <VscSymbolKeyword />
            나만의 단어장
          </SectionTitle>
          {loadingWords ? (
            <LoadingMessage>찜한 단어를 불러오는 중입니다...</LoadingMessage>
          ) : (
            <WordGrid>
              {likedWords.length > 0 ? (
                likedWords.map((word) => (
                  <WordCard key={word.id}>
                    <Word>{word.word}</Word>
                    <Translation>{word.translate}</Translation>
                    <DeleteButton
                      onClick={() => handleDeleteLikedWord(word.id)}
                    >
                      ❌
                    </DeleteButton>
                  </WordCard>
                ))
              ) : (
                <EmptyMessage>단어장이 비어 있습니다.</EmptyMessage>
              )}
            </WordGrid>
          )}
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
  min-width: 180px;
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

const ProfileImage = styled(FaUserCircle)`
  width: 80px;
  height: 80px;
  background-color: #dcdcdc;
  border-radius: 50%;
  margin-bottom: 10px;
  opacity: 70%;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Category = styled.div``;

const Keywords = styled.div``;

// const RecentArticles = styled.div`
//   margin: 20px 0;
// `;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
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
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.navy};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 15px;
  min-width: 60px;
  text-align: center;
  cursor: pointer;
`;
const ActionButton = styled(Button)`
  background-color: ${({ secondary }) =>
    secondary
      ? (props) => props.theme.colors.gray2
      : (props) => props.theme.colors.navy};
  color: ${({ secondary }) =>
    secondary
      ? (props) => props.theme.colors.black
      : (props) => props.theme.colors.white};

  &:hover {
    background-color: ${({ secondary }) =>
      secondary
        ? (props) => props.theme.colors.gray
        : (props) => props.theme.colors.blue};
  }
`;

const Main = styled.div`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 7px 9px rgba(0, 0, 0, 0.1);
`;

const Articles = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

const FavoriteArticles = styled.div`
  margin-bottom: 2vw;
  width: 50%;
`;

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ArticleGrid = styled.div`
  /* display: grid; */
  /* grid-template-columns: repeat(3, 1fr); */
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 280px;
  overflow-y: scroll;
  align-items: center;
`;

const ArticleCard = styled.div`
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  height: 100px;
  width: 90%;
  align-items: center;
`;

const ImagePlaceholder = styled.div`
  background-color: ${(props) => props.theme.colors.gray2};
  width: 240px;
  height: 80px;
  margin-bottom: 10px;
  border-radius: 8px;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ArticleTitle = styled.div`
  font-size: 14px;
`;

const WordList = styled.div`
  margin-top: 20px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 240px;
`;

const WordGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-height: 180px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.gray2};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.gray3};
  }
`;

const WordCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  background-color: ${(props) => props.theme.colors.lightBlue};
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Word = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.navy};
`;

const Translation = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.navy};
  margin-left: 10px;
  background-color: #fff;
  border-radius: 5px;
  padding: 3px 7px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 9px;
  cursor: pointer;
  margin-left: 10px;
  transition: color 0.2s ease;

  &:hover {
    color: darkred;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: ${(props) => props.theme.colors.gray3};
  font-size: 14px;
  width: 100%;
  margin-top: 20px;
`;

const Select = styled.select`
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: ${(props) => props.theme.colors.gray};
  padding: 20px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
  input {
    width: 100%;
  }
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 15px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export default MyPage;

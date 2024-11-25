import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../api/AuthApi";
import { FaUserCircle } from "react-icons/fa";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      alert("로그아웃 되었습니다.");
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      navigate("/auth/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Left>
        <Logo onClick={() => navigate("/")}>ENGNEWS</Logo>
        <Menu>
          <Item onClick={() => navigate("/naver")}>네이버 기사</Item>
          <Item onClick={() => navigate("/nyt")}>NY Times 기사</Item>
        </Menu>
      </Left>
      <BtnBox>
        {isLoggedIn ? (
          <>
            <Logout onClick={handleLogout}>로그아웃</Logout>
            <ProfileIcon onClick={() => navigate("/mypage")} />
          </>
        ) : (
          <>
            <Login onClick={() => navigate("/auth/login")}>로그인</Login>
            <Join onClick={() => navigate("/auth/signup")}>회원가입</Join>
          </>
        )}
      </BtnBox>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray2};
  padding: 0 40px;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
`;

const Logo = styled.div`
  margin-right: 50px;
  font-size: 30px;
  ${(props) => props.theme.fonts.logo};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Menu = styled.div`
  display: flex;
  gap: 50px;
  font-weight: 500;
  align-items: center;
  justify-content: center;
`;

const Item = styled.div`
  cursor: pointer;
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  font-size: 13px;
`;

const Login = styled.div`
  cursor: pointer;
`;

const Join = styled.div`
  cursor: pointer;
`;

const Logout = styled.div`
  cursor: pointer;
  color: ${(props) => props.theme.colors.red};
  margin-right: -10px;
`;

const ProfileIcon = styled(FaUserCircle)`
  font-size: 30px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.black};
  opacity: 70%;
  &:hover {
    opacity: 100%;
  }
`;

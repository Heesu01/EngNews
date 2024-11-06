import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Left>
        <Logo onClick={() => navigate("/")}>ENGNEWS</Logo>
        <Menu>
          <Item onClick={() => navigate("/news/:name")}>네이버 기사</Item>
          <Item onClick={() => navigate("/news/:name")}>NY Teams 기사</Item>
        </Menu>
      </Left>
      <BtnBox>
        <Login onClick={() => navigate("/auth/login")}>로그인</Login>
        <Join onClick={() => navigate("/auth/signup")}>회원가입</Join>
      </BtnBox>
    </Container>
  );
};

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

export default Header;

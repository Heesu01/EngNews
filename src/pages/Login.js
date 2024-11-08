import React from "react";
import Button from "../components/Button";
import InputFilled from "../components/InputFilled";
import styled from "styled-components";
import { RiKakaoTalkFill } from "react-icons/ri";

const Login = () => {
  return (
    <Container>
      <Logo>ENGNEWS</Logo>
      <Text>LOGIN</Text>
      <LoginBox>
        <InputFilled placeholder={"아이디를 입력해주세요."} />
        <InputFilled
          placeholder={"비밀번호를 입력해주세요."}
          type={"password"}
        />
        <Button>로그인</Button>
        <TextBox>
          계정이 없으신가요? <span>회원가입</span>
        </TextBox>
      </LoginBox>
      <KakaoLogin>
        <KakaoIcon />
        카카오톡으로 로그인
      </KakaoLogin>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15vh;
`;
const Logo = styled.div`
  width: 100%;
  ${(props) => props.theme.fonts.logo};
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Text = styled.div`
  width: 100%;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoginBox = styled.div`
  margin-top: 30px;
  width: 35vw;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: ${(props) => props.theme.colors.gray};
  span {
    font-size: 20px;
    cursor: pointer;
    color: ${(props) => props.theme.colors.black};
    opacity: 70%;
  }
  border-bottom: 1px solid ${(props) => props.theme.colors.gray2};
  padding-bottom: 20px;
`;
const KakaoLogin = styled.div`
  margin: 25px;
  padding: 5px 60px;
  border-radius: 10px;
  background-color: #fff049;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;
const KakaoIcon = styled(RiKakaoTalkFill)`
  font-size: 24px;
  margin-right: 5px;
`;
export default Login;

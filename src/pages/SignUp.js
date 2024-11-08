import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputFilled from "../components/InputFilled";
import styled from "styled-components";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Logo>ENGNEWS</Logo>
      <Text>SIGNUP</Text>
      <SignupBox>
        <InputContainer>
          <InputFilled placeholder="아이디를 입력해주세요." />
        </InputContainer>
        <InputContainer>
          <InputFilled placeholder="비밀번호를 입력해주세요." type="password" />
        </InputContainer>
        <InputContainer>
          <InputFilled placeholder="비밀번호를 다시 입력해주세요." />
        </InputContainer>
        <InputContainer>
          <InputFilled placeholder="닉네임을 입력해주세요." />
        </InputContainer>
        <Button onClick={() => navigate("/auth/login")}>회원가입</Button>
        <TextBox>
          이미 계정이 있으신가요?{" "}
          <span onClick={() => navigate("/auth/login")}>로그인</span>
        </TextBox>
      </SignupBox>
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

const SignupBox = styled.form`
  margin-top: 30px;
  width: 35vw;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  padding-bottom: 20px;
`;

export default SignUp;

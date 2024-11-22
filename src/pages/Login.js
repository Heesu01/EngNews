import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputFilled from "../components/InputFilled";
import styled from "styled-components";
import { RiKakaoTalkFill } from "react-icons/ri";
import { login } from "../api/AuthApi";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await login({ email: data.id, password: data.password });
      console.log("로그인 성공:", response);
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert(error.message || "로그인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Logo>ENGNEWS</Logo>
      <Text>LOGIN</Text>
      <LoginBox onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <InputFilled
            placeholder="아이디(이메일)를 입력해주세요."
            register={register("id", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "유효한 이메일 형식을 입력해주세요.",
              },
            })}
          />
          {errors.id && <ErrorMessage>{errors.id.message}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <InputFilled
            placeholder="비밀번호를 입력해주세요."
            type="password"
            register={register("password", {
              required: "비밀번호를 입력해주세요.",
              minLength: {
                value: 8,
                message: "비밀번호는 최소 8자 이상이어야 합니다.",
              },
              maxLength: {
                value: 20,
                message: "비밀번호는 최대 20자 이하이어야 합니다.",
              },
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                message: "비밀번호는 영어, 숫자, 기호를 포함해야 합니다.",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputContainer>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </Button>
        <TextBox>
          계정이 없으신가요?{" "}
          <span onClick={() => navigate("/auth/signup")}>회원가입</span>
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

const LoginBox = styled.form`
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

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 5px;
  margin-left: 5px;
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

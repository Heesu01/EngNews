import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputFilled from "../components/InputFilled";
import SignUpModal from "../components/SignupModal";
import styled from "styled-components";

const SignUp = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setIsModalOpen(true);
  };

  const password = watch("password");

  return (
    <Container>
      <Logo>ENGNEWS</Logo>
      <Text>SIGNUP</Text>
      <SignupBox onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <InputFilled
            placeholder="아이디를 입력해주세요."
            register={register("id", {
              required: "아이디를 입력해주세요.",
              minLength: {
                value: 5,
                message: "아이디는 최소 5자 이상이어야 합니다.",
              },
              maxLength: {
                value: 15,
                message: "아이디는 최대 15자 이하이어야 합니다.",
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
                value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/,
                message: "비밀번호는 영어와 기호를 포함해야 합니다.",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputContainer>
        <InputContainer>
          <InputFilled
            placeholder="비밀번호를 다시 입력해주세요."
            type="password"
            register={register("passwordConfirm", {
              required: "비밀번호를 다시 입력해주세요.",
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않습니다.",
            })}
          />
          {errors.passwordConfirm && (
            <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>
          )}
        </InputContainer>
        <InputContainer>
          <InputFilled
            placeholder="닉네임을 입력해주세요."
            register={register("nickname", {
              required: "닉네임을 입력해주세요.",
              minLength: {
                value: 2,
                message: "닉네임은 최소 2자 이상이어야 합니다.",
              },
              maxLength: {
                value: 10,
                message: "닉네임은 최대 10자 이하이어야 합니다.",
              },
            })}
          />
          {errors.nickname && (
            <ErrorMessage>{errors.nickname.message}</ErrorMessage>
          )}
        </InputContainer>
        <Button type="submit">회원가입</Button>
        <TextBox>
          이미 계정이 있으신가요?{" "}
          <span onClick={() => navigate("/auth/login")}>로그인</span>
        </TextBox>
      </SignupBox>
      {isModalOpen && <SignUpModal />}
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
  padding-bottom: 20px;
`;

export default SignUp;

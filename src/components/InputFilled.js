import React from "react";
import styled from "styled-components";

const InputFilled = ({ placeholder, type }) => {
  return (
    <Container>
      <Input placeholder={placeholder} type={type} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 47px;
  border-radius: 10px;
  border: 1.5px solid ${(props) => props.theme.colors.navy};
  outline: none;
  padding: 10px;
`;

export default InputFilled;

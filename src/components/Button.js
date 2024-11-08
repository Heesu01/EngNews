import React from "react";
import styled from "styled-components";

const Button = ({ children, onClick, hoverColor, type }) => {
  return (
    <Container>
      <Btn onClick={onClick} hoverColor={hoverColor} type={type}>
        {children}
      </Btn>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;
const Btn = styled.button`
  width: 100%;
  height: 47px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.navy};
  &:hover {
    background-color: ${(props) => props.hoverColor || props.theme.colors.blue};
  }
  color: ${(props) => props.theme.colors.white};
  font-size: 16px;
`;

export default Button;

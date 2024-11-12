import React from "react";
import styled from "styled-components";

const Category = ({ label, selected, onClick }) => {
  return (
    <StyledButton selected={selected} onClick={onClick}>
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  min-width: 70px;
  padding: 8px 12px;
  border: 1px solid ${(props) => props.theme.colors.navy};
  border-radius: 4px;
  background-color: ${(props) =>
    props.selected ? props.theme.colors.navy : props.theme.colors.white};
  color: ${(props) =>
    props.selected ? props.theme.colors.white : props.theme.colors.black};
  cursor: pointer;
`;

export default Category;

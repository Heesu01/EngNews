import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <Description>
        뉴스만 읽었을 뿐인데, 영어 실력과 트렌드가 쑥쑥! - 잉뉴스
      </Description>
      <TeamTitle>ENGNEWS</TeamTitle>
      <TeamMembers>
        <Member>
          <b>ML</b> 박서윤 | <b>ML</b> 마예은
        </Member>
        <Member>
          <b>BE</b> 박주희 | <b>BE</b> 최현서 | <b>FE</b> 김희수
        </Member>
      </TeamMembers>
      <Copyright>© 2024 ENGNEWS. All Rights Reserved.</Copyright>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.black2};
  padding: 30px 150px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Description = styled.p`
  margin-bottom: 20px;
`;

const TeamTitle = styled.div`
  ${(props) => props.theme.fonts.logo};
  margin-bottom: 10px;
`;

const TeamMembers = styled.div`
  color: ${(props) => props.theme.colors.gray};
`;

const Member = styled.div`
  margin: 2px 0;
  b {
    font-weight: bold;
  }
`;

const Copyright = styled.div`
  color: ${(props) => props.theme.colors.grayLight};
  margin-top: 20px;
  font-size: 0.8em;
`;

export default Footer;

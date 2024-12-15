import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsTranslate } from "react-icons/bs";
import { LuText } from "react-icons/lu";
import { IoChatbubbleSharp, IoChatbubbleOutline } from "react-icons/io5";
import { FaNewspaper, FaRegNewspaper } from "react-icons/fa6";

const LeftBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    const currentPath = location.pathname;
    const nameMatch = currentPath.match(/\/news\/([^/]+)/);
    const name = nameMatch ? nameMatch[1] : "default";

    const params = location.search;

    navigate(`/news/${name}${path}${params}`);
  };

  return (
    <Container>
      <SectionTitle>AI 기능 선택</SectionTitle>
      <Section>
        <Button
          isActive={location.pathname === "/translate"}
          onClick={() => handleNavigation("/translate")}
        >
          <BsTranslate />
          <span>뉴스 번역</span>
        </Button>
        <Button
          isActive={location.pathname === "/summary"}
          onClick={() => handleNavigation("/summary")}
        >
          <LuText />
          <span>뉴스 요약</span>
        </Button>
        <Button
          isActive={location.pathname === "/trytranslate"}
          onClick={() => handleNavigation("/trytranslate")}
        >
          <IoChatbubbleSharp />
          <span>번역해보기</span>
        </Button>
        <Button
          isActive={location.pathname === "/trysummary"}
          onClick={() => handleNavigation("/trysummary")}
        >
          <IoChatbubbleOutline />
          <span>요약해보기</span>
        </Button>
      </Section>
      <SectionTitle>관련기사 탐색</SectionTitle>
      <Section>
        <Button
          isActive={location.pathname === "/related-news"}
          onClick={() => handleNavigation("/related-news")}
        >
          <FaNewspaper />
          <span>관련한국기사</span>
        </Button>
        <Button
          isActive={location.pathname === "/related-news"}
          onClick={() => handleNavigation("/related-news")}
        >
          <FaRegNewspaper />
          <span>관련외국기사</span>
        </Button>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  width: 30%;
  height: 100%;
  padding: 20px 10px;
  padding-right: 0;
`;

const Section = styled.div`
  margin-bottom: 30px;
  padding: 20px 10px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  padding-left: 5px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  font-size: 14px;
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.blue : props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gray2};
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  svg {
    margin-right: 8px;
    color: ${(props) =>
      props.isActive ? props.theme.colors.white : props.theme.colors.black};
  }

  span {
    flex: 1;
    text-align: left;
    color: ${(props) =>
      props.isActive ? props.theme.colors.white : props.theme.colors.black};
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.blue};
    svg,
    span {
      color: ${(props) => props.theme.colors.white};
    }
  }
`;

export default LeftBar;

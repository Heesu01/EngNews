import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import LeftBar from "../components/LeftBar";
import Article from "../components/Article";

const RelatedNews = () => {
  const [activeTab, setActiveTab] = useState("korean");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/news/related-news/:korea") {
      setActiveTab("korean");
    } else if (location.pathname === "/news/related-news/:english") {
      setActiveTab("english");
    }
  }, [location.pathname]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "korean") {
      navigate("/news/related-news/korean");
    } else if (tab === "english") {
      navigate("/news/related-news/english");
    }
  };

  return (
    <Container>
      <LeftBar />
      <Article />
      <RightBar>
        <Tabs>
          <Tab
            isActive={activeTab === "korean"}
            onClick={() => handleTabClick("korean")}
          >
            한글 관련기사
          </Tab>
          <Tab
            isActive={activeTab === "english"}
            onClick={() => handleTabClick("english")}
          >
            영어 관련기사
          </Tab>
        </Tabs>
        <Content>
          {activeTab === "korean" && (
            <ArticleList>
              <li>한국 기사 1</li>
              <li>한국 기사 2</li>
              <li>한국 기사 3</li>
            </ArticleList>
          )}
          {activeTab === "english" && (
            <ArticleList>
              <li>English Article 1</li>
              <li>English Article 2</li>
              <li>English Article 3</li>
            </ArticleList>
          )}
        </Content>
      </RightBar>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 40px;
  width: 100%;
  display: flex;
  gap: 10px;
`;

const RightBar = styled.div`
  width: 30%;
  padding: 20px 10px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
  margin-bottom: 10px;
`;

const Tab = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  color: ${(props) =>
    props.isActive ? props.theme.colors.navy : props.theme.colors.gray};
  border-bottom: ${(props) =>
    props.isActive ? `2px solid ${props.theme.colors.navy}` : "none"};
`;

const Content = styled.div`
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.5;
`;

const ArticleList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    min-height: 100px;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export default RelatedNews;

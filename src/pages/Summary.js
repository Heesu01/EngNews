import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import LeftBar from "../components/LeftBar";
import Article from "../components/Article";
import { postSummarize } from "../api/NewsApi";

const Summary = () => {
  const [activeTab, setActiveTab] = useState("translate");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/news/translate") {
      setActiveTab("translate");
    } else if (location.pathname === "/news/summary") {
      setActiveTab("summary");
    }
  }, [location.pathname]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "translate") {
      navigate("/news/translate");
    } else if (tab === "summary") {
      navigate("/news/summary");
    }
  };

  const fetchSummary = async (content) => {
    try {
      setLoading(true);
      setError(null);

      const response = await postSummarize({ news_content: content });
      setSummary(response.data.gpt_answer);
    } catch (err) {
      setError(err.message || "요약 요청 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "summary") {
      const articleContent = "여기서 기사 내용을 가져오세요";
      fetchSummary(articleContent);
    }
  }, [activeTab]);

  return (
    <Container>
      <LeftBar />
      <Article />
      <RightBar>
        <Tabs>
          <Tab
            isActive={activeTab === "translate"}
            onClick={() => handleTabClick("translate")}
          >
            뉴스 번역
          </Tab>
          <Tab
            isActive={activeTab === "summary"}
            onClick={() => handleTabClick("summary")}
          >
            뉴스 요약
          </Tab>
        </Tabs>
        <Content>
          {activeTab === "translate" && <p>번역된 내용을 여기에 표시합니다.</p>}
          {activeTab === "summary" && (
            <>
              {loading && <p>요약 요청 중...</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
              {summary && <p>{summary}</p>}
            </>
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

export default Summary;

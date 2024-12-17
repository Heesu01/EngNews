import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import LeftBar from "../components/LeftBar";
import Article from "../components/Article";
import { fetchArticleDetail, postSummarize } from "../api/NewsApi";

const Summary = () => {
  const [activeTab, setActiveTab] = useState("translate");
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articleData, setArticleData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const extractNameFromPath = useCallback(() => {
    const match = location.pathname.match(/\/news\/(naver|nyt)/);
    return match ? match[1] : null;
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.includes("/summary")) {
      setActiveTab("summary");
    } else if (location.pathname.includes("/translate")) {
      setActiveTab("translate");
    }
  }, [location.pathname]);

  const fetchArticle = useCallback(async () => {
    try {
      const params = new URLSearchParams(location.search);
      const url = params.get("url");
      const newsType = extractNameFromPath();

      if (!url || !newsType)
        throw new Error("URL 또는 뉴스 유형을 가져오지 못했습니다.");

      const response = await fetchArticleDetail(newsType, url);
      setArticleData(response.data);
    } catch (err) {
      setError(err.message || "기사 내용을 가져오지 못했습니다.");
    }
  }, [location, extractNameFromPath]);

  const cleanResponse = (response) => {
    if (!response) return "";
    return response
      .replace(/^"|"$/g, "")
      .replace(/\\n/g, "\n")
      .replace(/\\\\n/g, "\n");
  };

  const fetchSummary = useCallback(async () => {
    if (!articleData?.content || summary) return;

    try {
      setSummaryLoading(true);
      setError(null);

      const response = await postSummarize({
        news_content: articleData.content,
      });

      const cleanedSummary = cleanResponse(response.data.gpt_answer);
      setSummary(cleanedSummary);
    } catch (err) {
      setError(err.message || "요약 요청 중 문제가 발생했습니다.");
    } finally {
      setSummaryLoading(false);
    }
  }, [articleData, summary]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  useEffect(() => {
    if (activeTab === "summary" && articleData) {
      fetchSummary();
    }
  }, [activeTab, fetchSummary, articleData]);

  const handleTabClick = (tab) => {
    const params = new URLSearchParams(location.search);
    const url = params.get("url");
    const name = extractNameFromPath();

    if (!url || !name) {
      setError("URL 또는 뉴스 유형을 가져오지 못했습니다.");
      return;
    }

    if (tab === "translate") {
      navigate(`/news/${name}/translate${location.search}`);
    } else if (tab === "summary") {
      navigate(`/news/${name}/summary${location.search}`);
    }
    setActiveTab(tab);
  };

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
              {summaryLoading && <p>요약 요청 중...</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
              {summary && <p style={{ whiteSpace: "pre-wrap" }}>{summary}</p>}
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

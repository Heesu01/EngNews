import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Axios } from "../api/Axios";
import LeftBar from "../components/LeftBar";
import Article from "../components/Article";

const TryS = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const [messages, setMessages] = useState([]);
  const [summaryInput, setSummaryInput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isSummarySet, setIsSummarySet] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const messagesRef = useRef(null);

  const handleNavigation = (path) => {
    const params = location.search;
    navigate(`${path}${params}`);
  };

  useEffect(() => {
    if (location.pathname === "/news/trytranslate") {
      setActiveTab("translate");
    } else if (location.pathname === "/news/trysummary") {
      setActiveTab("summary");
    }
  }, [location.pathname]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "translate") {
      handleNavigation("/news/:name/trytranslate");
    } else if (tab === "summary") {
      handleNavigation("/news/:name/trysummary");
    }
  };

  const handleSetSummaryInput = () => {
    if (summaryInput.trim() === "") return;
    setIsSummarySet(true);
    setMessages((prev) => [
      ...prev,
      { type: "info", text: `요약할 문장: ${summaryInput}` },
    ]);
  };

  const handleSend = async () => {
    if (!isSummarySet) {
      alert("먼저 요약할 문장을 입력해주세요.");
      return;
    }
    if (userInput.trim() === "") return;

    const userMessage = { type: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await Axios.post("/try-summarize", {
        message: userInput,
        news_content: summaryInput,
      });

      const botMessage = {
        type: "bot",
        text: response.data.data.gpt_answer.replace(
          /^{\s*"gpt_answer":\s*"|"\s*}$/g,
          ""
        ),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("API 요청 실패:", error);
      const errorMessage = {
        type: "bot",
        text: "요약 요청에 실패했습니다. 다시 시도해주세요.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setUserInput("");
    }
  };

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

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
            번역해보기
          </Tab>
          <Tab
            isActive={activeTab === "summary"}
            onClick={() => handleTabClick("summary")}
          >
            요약해보기
          </Tab>
        </Tabs>
        <Content>
          {activeTab === "summary" && (
            <ChatContainer>
              {!isSummarySet && (
                <InitialInputContainer>
                  <Input
                    value={summaryInput}
                    onChange={(e) => setSummaryInput(e.target.value)}
                    placeholder="요약할 내용을 입력하세요."
                  />
                  <SetButton onClick={handleSetSummaryInput}>설정</SetButton>
                </InitialInputContainer>
              )}
              <Messages ref={messagesRef}>
                {messages.map((msg, idx) => (
                  <MessageBubble
                    key={idx}
                    isUser={msg.type === "user"}
                    isInfo={msg.type === "info"}
                  >
                    {msg.text}
                  </MessageBubble>
                ))}
              </Messages>
              <InputContainer>
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="요약 요청 메시지를 입력하세요."
                />
                <SendButton onClick={handleSend}>전송</SendButton>
              </InputContainer>
            </ChatContainer>
          )}
        </Content>
      </RightBar>
    </Container>
  );
};

// Styled Components
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
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
`;

const InitialInputContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Messages = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.isInfo
      ? props.theme.colors.lightGray
      : props.isUser
      ? props.theme.colors.navy
      : props.theme.colors.lightBlue};
  color: ${(props) =>
    props.isInfo
      ? props.theme.colors.black
      : props.isUser
      ? props.theme.colors.white
      : props.theme.colors.black};
  align-self: ${(props) =>
    props.isUser || props.isInfo ? "flex-end" : "flex-start"};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid ${(props) => props.theme.colors.gray};
  background-color: white;
`;

const Input = styled.input`
  flex: 1;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 4px;
  font-size: 14px;
  padding: 5px;
`;

const SetButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.colors.navy};
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.darkNavy};
  }
`;

const SendButton = styled.button`
  width: 50px;
  margin-left: 10px;
  padding: 5px;
  background-color: ${(props) => props.theme.colors.navy};
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.darkNavy};
  }
`;

export default TryS;

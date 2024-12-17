import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Axios } from "../api/Axios";
import LeftBar from "../components/LeftBar";
import Article from "../components/Article";

const TryT = () => {
  const [activeTab, setActiveTab] = useState("translate");
  const [messages, setMessages] = useState([]);
  const [translateInput, setTranslateInput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isTranslationSet, setIsTranslationSet] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const messagesRef = useRef(null);

  const extractNameFromPath = useCallback(() => {
    const match = location.pathname.match(/\/news\/([^/]+)/);
    return match ? match[1] : null;
  }, [location.pathname]);

  useEffect(() => {
    const name = extractNameFromPath();
    if (location.pathname.startsWith(`/news/${name}/trytranslate`)) {
      setActiveTab("translate");
    } else if (location.pathname.startsWith(`/news/${name}/trysummary`)) {
      setActiveTab("summary");
    }
  }, [extractNameFromPath, location.pathname]);

  const handleTabClick = (tab) => {
    const name = extractNameFromPath();
    if (tab === "translate") {
      navigate(`/news/${name}/trytranslate${location.search}`);
    } else if (tab === "summary") {
      navigate(`/news/${name}/trysummary${location.search}`);
    }
    setActiveTab(tab);
  };

  const formatResponseText = (text) => {
    if (!text) return "";
    return text
      .replace(/^"|"$/g, "")
      .replace(/\\n/g, "\n")
      .replace(/\\"/g, '"')
      .trim();
  };

  const handleSetTranslateInput = async () => {
    if (translateInput.trim() === "") return;
    try {
      const response = await Axios.post("/try-translate/sentence", {
        news_content: translateInput,
      });
      const gptAnswer = response?.data?.data?.gpt_answer;
      if (!gptAnswer) throw new Error("gpt_answer가 존재하지 않습니다.");

      const botMessage = {
        type: "bot",
        text: formatResponseText(gptAnswer),
      };

      setMessages([
        { type: "info", text: `번역할 문장: ${translateInput}` },
        botMessage,
      ]);
      setIsTranslationSet(true);
    } catch (error) {
      console.error("API 요청 실패:", error);
      alert("요약 요청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSend = async () => {
    if (!isTranslationSet) {
      alert("먼저 번역할 문장을 입력해주세요.");
      return;
    }
    if (userInput.trim() === "") return;

    const userMessage = { type: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await Axios.post("/try-translate/message", {
        message: userInput,
      });

      const gptAnswer = response?.data?.data?.gpt_answer;
      if (!gptAnswer) throw new Error("gpt_answer가 존재하지 않습니다.");

      const botMessage = {
        type: "bot",
        text: formatResponseText(gptAnswer),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("API 요청 실패:", error);
      const errorMessage = {
        type: "bot",
        text: "번역 요청에 실패했습니다. 다시 시도해주세요.",
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
          {activeTab === "translate" && (
            <ChatContainer>
              <InitialInputContainer>
                <Input
                  value={translateInput}
                  onChange={(e) => setTranslateInput(e.target.value)}
                  placeholder="번역할 문장을 입력하세요."
                />
                <SetButton onClick={handleSetTranslateInput}>설정</SetButton>
              </InitialInputContainer>
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
                  placeholder="번역 요청 메시지를 입력하세요."
                />
                <SendButton onClick={handleSend}>전송</SendButton>
              </InputContainer>
            </ChatContainer>
          )}
          {/* {activeTab === "summary" && (
            <p>여기는 요약해보기 탭의 내용을 표시합니다.</p>
          )} */}
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
  height: 100%;
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
  min-height: 700px;
  max-height: 1000px;
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

export default TryT;

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import LeftBar from "../components/LeftBar";
import Article from "../components/Article";

const TryS = () => {
  const [activeTab, setActiveTab] = useState("translate");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const messagesRef = useRef(null);

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
      navigate("/news/trytranslate");
    } else if (tab === "summary") {
      navigate("/news/trysummary");
    }
  };

  const handleSend = () => {
    if (inputValue.trim() === "") return;
    const newMessage = { type: "user", text: inputValue };
    const responseMessage = {
      type: "bot",
      text: `피드백 결과: ${inputValue}`,
    };

    setMessages((prev) => [...prev, newMessage, responseMessage]);
    setInputValue("");
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
            <p>여기는 번역해보기 탭의 내용을 표시합니다.</p>
          )}
          {activeTab === "summary" && (
            <ChatContainer>
              <Messages ref={messagesRef}>
                {messages.map((msg, idx) => (
                  <MessageBubble key={idx} isUser={msg.type === "user"}>
                    {msg.text}
                  </MessageBubble>
                ))}
              </Messages>
              <InputContainer>
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="요약 내용을 입력하세요."
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
    props.isUser ? props.theme.colors.navy : props.theme.colors.lightBlue};
  color: ${(props) =>
    props.isUser ? props.theme.colors.white : props.theme.colors.black};
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid ${(props) => props.theme.colors.gray};
  background-color: white;
  margin-top: 10px;
`;

const Input = styled.input`
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 4px;
  font-size: 14px;
  padding: 5px;
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

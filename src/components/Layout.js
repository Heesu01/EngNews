import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <Main>{children}</Main>
      <FooterBox>
        <Footer />
      </FooterBox>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const HeaderWrapper = styled.div`
  height: 80px;
`;

const Main = styled.main`
  flex: 1;
`;

const FooterBox = styled.div`
  margin-top: 5vh;
`;

export default Layout;

import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import NaverNews from "./pages/NaverNews";
import NytNews from "./pages/NytNews";
import NewsDetail from "./pages/NewsDetail";
import Analyze from "./pages/Analyze";
import RelatedNews from "./pages/RelatedNews";
import TryT from "./pages/TryT";
import TryS from "./pages/TryS";
import Layout from "./components/Layout";
import Summary from "./pages/Summary";
import Translation from "./pages/Translation";
import { useEffect, useState } from "react";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<Main />} />
        <Route
          path="/auth/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/naver" element={<NaverNews />} />
        <Route path="/nyt" element={<NytNews />} />
        <Route path="/news/:name" element={<NewsDetail />} />
        <Route path="/news/:name/summary" element={<Summary />} />
        <Route path="/news/:name/translate" element={<Translation />} />
        <Route path="/news/:name/related-news" element={<RelatedNews />} />
        <Route path="/news/:name/trytranslate" element={<TryT />} />
        <Route path="/news/:name/trysummary" element={<TryS />} />
        <Route path="/news/:name/analyze" element={<Analyze />} />
      </Routes>
      <ScrollToTop />
    </Layout>
  );
}

export default App;

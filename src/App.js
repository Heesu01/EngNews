import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Analyze from "./pages/Analyze";
import RelatedNews from "./pages/RelatedNews";
import TryT from "./pages/TryT";
import TryS from "./pages/TryS";
import Layout from "./components/Layout";
import Summary from "./pages/Summary";
import Translation from "./pages/Translation";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<Main />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/news/:name" element={<News />} />
        <Route path="/news/newsId" element={<NewsDetail />} />
        <Route path="/news/summary" element={<Summary />} />
        <Route path="/news/translate" element={<Translation />} />
        <Route path="/news/related-news/:languages" element={<RelatedNews />} />
        <Route path="/news/trytranslate" element={<TryT />} />
        <Route path="/news/trysummary" element={<TryS />} />
        <Route path="/news/analyze" element={<Analyze />} />
      </Routes>
    </Layout>
  );
}

export default App;

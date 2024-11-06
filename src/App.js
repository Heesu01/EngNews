import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Analyze from "./pages/Analyze";
import RelatedNews from "./pages/RelatedNews";
import Try from "./pages/Try";
import SyntaxAnalysis from "./pages/SyntaxAnalysis";
import Layout from "./components/Layout";

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
        <Route path="/news/:newsId" element={<NewsDetail />} />
        <Route path="/analyze/:type" element={<Analyze />} />
        <Route path="/related-news" element={<RelatedNews />} />
        <Route path="/try/:type" element={<Try />} />
        <Route path="/syntax-analysis" element={<SyntaxAnalysis />} />
      </Routes>
    </Layout>
  );
}

export default App;

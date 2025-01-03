import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NewsFeedPage } from "./pages/NewsFeedPage";
import { SearchPage } from "./pages/SearchPage";
import { Layout } from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<NewsFeedPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

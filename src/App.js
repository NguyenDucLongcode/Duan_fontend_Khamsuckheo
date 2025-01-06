import HomePage from "./homePage/homPage";
import "./app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutHomePage from "./Layout/layoutHomePage";
function App() {
  return (
    <Router>
      <Routes>
        {/* Layout chính cho các trang công khai */}
        <Route path="/" element={<LayoutHomePage />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

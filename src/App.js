import HomePage from "./homePage/homPage";
import "./app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutHomePage from "./Layout/layoutHomePage";
import { ToastContainer, Bounce } from "react-toastify";
import Login from "./auth/Login";
import LayoutAdmin from "./Layout/layoutAdmin";
import ManagerUser from "./homePage/admin/ManagerUser/ManagerUser";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Layout chính cho các trang công khai */}
          <Route path="/" element={<LayoutHomePage />}>
            <Route index element={<HomePage />} />
          </Route>

          {/* auth */}
          <Route path="login" element={<Login />} />

          {/* admin */}
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<ManagerUser />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;

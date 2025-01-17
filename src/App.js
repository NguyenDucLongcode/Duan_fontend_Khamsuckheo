import HomePage from "./homePage/homPage";
import "./app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutHomePage from "./Layout/layoutHomePage";
import { ToastContainer, Bounce } from "react-toastify";
import Login from "./auth/Login";
import LayoutSystem from "./Layout/layoutSystem";
import DetailDoctor from "./homePage/section/doctor/detailDoctor";
import {
  ManagerUser,
  HomePageAdmin,
  ManagerDoctor,
} from "./homePage/admin/index";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Layout chính cho các trang công khai */}
          <Route path="/" element={<LayoutHomePage />}>
            <Route index element={<HomePage />} />
            <Route path="doctor/:id" element={<DetailDoctor />} />
          </Route>

          {/* auth */}
          <Route path="login" element={<Login />} />

          {/* admin */}
          <Route path="/system" element={<LayoutSystem />}>
            <Route index element={<HomePageAdmin />} />
            <Route path="User" element={<ManagerUser />} />
            <Route path="Doctor" element={<ManagerDoctor />} />
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

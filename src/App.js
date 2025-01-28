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
import VerifyBooking from "./homePage/section/doctor/verilyBooking";
import ManagerSpecialist from "./homePage/admin/ManagerSpecialists/ManagerSpecialist";
import DetailSpecialty from "./homePage/section/specialty/detailSpecialty";
import ManagerClinic from "./homePage/admin/MangerClinic/ManagClinic";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Layout chính cho các trang công khai */}
          <Route path="/" element={<LayoutHomePage />}>
            <Route index element={<HomePage />} />
            <Route path="doctor/:id" element={<DetailDoctor />} />
            <Route path="specialty/:id" element={<DetailSpecialty />} />
            <Route path="verify-booking" element={<VerifyBooking />} />
          </Route>

          {/* auth */}
          <Route path="login" element={<Login />} />

          {/* admin */}
          <Route path="/system" element={<LayoutSystem />}>
            <Route index element={<HomePageAdmin />} />
            <Route path="User" element={<ManagerUser />} />
            <Route path="Doctor" element={<ManagerDoctor />} />
            <Route path="Specialty" element={<ManagerSpecialist />} />
            <Route path="Clinic" element={<ManagerClinic />} />
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

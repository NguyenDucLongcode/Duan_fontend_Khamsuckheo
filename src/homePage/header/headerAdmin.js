import "./headerAdmin.scss";
import { useDispatch } from "react-redux";
import { userLogOut } from "../../redux/Slice/userSlice";
import { useNavigate } from "react-router";
import { persistor } from "../../redux/store";

const HeaderAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(userLogOut());
    // Xóa storage
    persistor.purge();
    navigate("/login");
  };

  return (
    <header className="header-admin">
      <div className="logo">MyBrand</div>
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <span className="nav-link">User</span>
          </li>
          <li>
            <span className="nav-link">Clinic</span>
          </li>
          <li>
            <span className="nav-link">Specialty</span>
          </li>
          <li>
            <span className="nav-link">Handbook</span>
          </li>
        </ul>
      </nav>
      <div className="right-section">
        <select className="language-select">
          <option value="en">English</option>
          <option value="vi">Tiếng Việt</option>
        </select>
        <button className="logout-btn" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </header>
  );
};
export default HeaderAdmin;

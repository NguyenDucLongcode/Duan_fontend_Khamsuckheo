import "./headerSystem.scss";
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../../redux/Slice/userSlice";
import { useNavigate, Link, useLocation } from "react-router";
import { persistor } from "../../redux/store";

const HeaderSystem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.userInfor);
  const avatar = user?.image;
  const isRole = user?.roleId;

  const handleLogOut = () => {
    dispatch(userLogOut());
    // Xóa storage
    persistor.purge();
    navigate("/login");
  };

  const handleClickLogo = () => {
    navigate("/");
  };
  // setup hover
  let tabs = [];

  // check role admin
  if (isRole === "R1") {
    tabs = ["Home", "User", "Doctor", "Clinic", "Specialty", "Handbook"];
  }
  // check role doctor
  if (isRole === "R2") {
    tabs = ["Home", "Doctor"];
  }
  const activeTab = location.pathname.split("/")[2];
  return (
    <header className="header-admin">
      <div className="logo" onClick={handleClickLogo}>
        {avatar ? <img src={avatar} alt="avatar" /> : "no image"}
      </div>
      <nav className="nav">
        <ul className="nav-list">
          {tabs.map((tab) => (
            <li key={tab}>
              <Link
                to={tab === "Home" ? "/system" : `/system/${tab}`}
                className={`nav-link ${activeTab === tab ? "active" : ""}`}
              >
                {tab}
              </Link>
            </li>
          ))}
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
export default HeaderSystem;

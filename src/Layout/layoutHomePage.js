import { Outlet } from "react-router-dom";
import HeaderHomePage from "../homePage/header/headerHomePage";
import "./LayoutHomePage.scss";

const LayoutHomePage = () => {
  return (
    <>
      <div className="Layout-container">
        <header className="homePage_header">
          <HeaderHomePage />
        </header>
        <div className="homePage_body">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default LayoutHomePage;

import HeaderSystem from "../homePage/header/headerSystem";
import { Outlet } from "react-router-dom";
import "./layoutSystem.scss";

const LayoutSystem = () => {
  return (
    <div className="LayoutSystem-container">
      <div className="LayoutSystem-header">
        <HeaderSystem />
      </div>
      <div className="LayoutSystem-header">
        <Outlet />
      </div>
    </div>
  );
};
export default LayoutSystem;

import HeaderAdmin from "../homePage/header/headerAdmin";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <>
      <div className="LayoutAdmin-header">
        <HeaderAdmin />
      </div>
      <div className="LayoutAdmin-header">
        <Outlet />
      </div>
    </>
  );
};
export default LayoutAdmin;

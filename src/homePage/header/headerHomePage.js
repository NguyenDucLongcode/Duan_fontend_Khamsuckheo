import "./headerHomePage.scss";
import { FaBars, FaQuestionCircle } from "react-icons/fa";
import logo from "../../assets/logo.svg";

const HeaderHomePage = () => {
  return (
    <div className="headerHomeP-container">
      <div className="left-content">
        <FaBars className="left-content-icon" />
        <img src={logo} alt="logo" />
        <span>BookingCare</span>
      </div>
      <div className="center-content">
        <div className="box-info box1">
          <p>Chuyên Khoa</p>
          <p>Tìm bác sĩ theo chuyên khoa</p>
        </div>
        <div className="box-info box2">
          <p>Cở sở y tế</p>
          <p>Chọn bệnh viện phòng khám</p>
        </div>
        <div className="box-info box3">
          <p>Bác sĩ</p>
          <p>Chọn bác sĩ giỏi</p>
        </div>
        <div className="box-info box4">
          <p>Gói khám</p>
          <p>Khám sức khỏe tổng quan</p>
        </div>
      </div>
      <div className="right-content">
        <FaQuestionCircle className="right-content-icon" />
        <span>Hỗ trợ VN</span>
      </div>
    </div>
  );
};
export default HeaderHomePage;

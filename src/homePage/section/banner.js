import "./Banner.scss";
import { IoSearchSharp } from "react-icons/io5";
import { BsHospital } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { FaMicroscope } from "react-icons/fa6";
import { GiMicroscopeLens, GiVibratingSmartphone } from "react-icons/gi";
import { FaTooth } from "react-icons/fa";
const Banner = () => {
  return (
    <div className="Banner-container">
      <div className="Banner-background">
        <div className="content-up">
          <div className="title">
            <p>NỀN TẢNG Y TẾ</p>
            <p> CHĂM SÓC SỨC KHẺO TOÀN DIỆN</p>
          </div>
          <div className="search">
            <IoSearchSharp className="search-icon" />
            <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
          </div>
        </div>
        <div className="content-down">
          <div className="option">
            {/* option1 */}
            <div className="option-child option1">
              <div className="background-icon">
                <BsHospital className="option-icon icon1" />
              </div>
              <p>Khám</p>
              <p>Chuyên khoa</p>
            </div>
            {/* option2 */}
            <div className="option-child option2">
              <div className="background-icon">
                <GiVibratingSmartphone className="option-icon icon2" />
              </div>
              <p>Khám</p>
              <p>Từ xa</p>
            </div>
            {/* option3 */}
            <div className="option-child option3">
              <div className="background-icon">
                <ImProfile className="option-icon icon3" />
              </div>
              <p>Khám</p>
              <p>Tổng quát</p>
            </div>
            {/* option4 */}
            <div className="option-child option4">
              <div className="background-icon">
                <FaMicroscope className="option-icon icon4" />
              </div>
              <p>Xét nghiệm</p>
              <p>Y học</p>
            </div>
            {/* option 5 */}
            <div className="option-child option5">
              <div className="background-icon">
                <GiMicroscopeLens className="option-icon icon5" />
              </div>
              <p>Sức Khẻo</p>
              <p>Tinh thần</p>
            </div>
            {/* option 6 */}
            <div className="option-child option6">
              <div className="background-icon">
                <FaTooth className="option-icon icon6" />
              </div>
              <p>Khám</p>
              <p>Nha khoa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;

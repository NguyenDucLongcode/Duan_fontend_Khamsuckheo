import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import "./homePageFooter.scss";

const HomePageFooter = () => {
  return (
    <div className="footer-container">
      <div className="title">
        <span>Giới thiệu Channel EDM</span>
      </div>
      <div className="footer-box">
        <div className="box-video d-flex gap-5">
          <div>
            <iframe
              width="907"
              height="514"
              src="https://www.youtube.com/embed/qAZVnSc0IpI"
              title='Top Nhạc Thư Giãn Chơi Game Cực Phiêu "Tuyệt Đỉnh Gây Nghiện" ♫ Chút Nhạc Quẩy Game Cho Ngày Dài'
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          <div className="box-title">
            <i>
              Top Nhạc Thư Giãn Chơi Game Cực Phiêu "Tuyệt Đỉnh Gây Nghiện" ♫
              Chút Nhạc Quẩy Game Cho Ngày Dài ● Tác giả ảnh (Author Pic): (We
              use wallpapers from Google "Free to use". If you are the artist
              and someone uploaded it there, please message us and we will give
              credits or remove the video at your will!)
            </i>
          </div>
        </div>
      </div>
      <div className="footer-infor">
        <div>
          2025 Long siêu cấp đẹp trai. More information. please with my youtube
          Channel
          <span>
            <FaLongArrowAltRight />
            <a href="#ss">Click here</a>
            <FaLongArrowAltLeft />
          </span>
        </div>
      </div>
    </div>
  );
};
export default HomePageFooter;

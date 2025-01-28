import { useState } from "react";
import _ from "lodash";
import Slider from "react-slick";
import "./scss/sectionSpecialty.scss";
import { useNavigate } from "react-router";

const SectionSpecialty = (props) => {
  const { dataSpecialist } = props;
  let navigate = useNavigate();
  const [isAtStart, setIsAtStart] = useState(true); // Trạng thái kiểm tra slider có ở đầu không
  const [isAtEnd, setIsAtEnd] = useState(false); // Trạng thái kiểm tra slider có ở cuối không

  const settings = {
    dots: false,
    infinite: false, // Đặt infinite là false để có thể điều khiển mũi tên
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      // Cập nhật trạng thái khi chuyển slides
      if (next === 0) {
        setIsAtStart(true); // Ở đầu
      } else if (next === groups.length - 1) {
        setIsAtEnd(true); // Ở cuối
      } else {
        setIsAtStart(false); // Không phải đầu
        setIsAtEnd(false); // Không phải cuối
      }
    },
    prevArrow: (
      <button
        className={`slick-prev ${isAtStart ? "slick-disabled" : ""}`}
        disabled={isAtStart}
      >
        &#8592;
      </button>
    ),
    nextArrow: (
      <button
        className={`slick-next ${isAtEnd ? "slick-disabled" : ""}`}
        disabled={isAtEnd}
      >
        &#8594;
      </button>
    ),
  };

  const data = dataSpecialist?.data || [];
  const groups = _.chunk(data, 4); // Chia thành các nhóm 4 phần tử

  return (
    <div className="section-specialist-container">
      <div className="section-content">
        <div className="section-title">
          <span>Chuyên khoa</span>
        </div>
        <div className="section-slice">
          <Slider {...settings}>
            {groups.map((group, groupIndex) => (
              <div
                className="section-slice-child d-flex gap-3"
                key={groupIndex}
              >
                {group.map((specialty, specialtyIndex) => (
                  <div
                    className="option-child"
                    key={specialtyIndex}
                    onClick={() => navigate(`/specialty/${specialty.id}`)}
                  >
                    <img src={specialty.image} alt="logo" />
                    <p>
                      {`Khoa ${specialty.name}`}
                      <br />
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
export default SectionSpecialty;

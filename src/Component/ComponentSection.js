import "./ComponentSection.scss";
import React from "react";
import Slider from "react-slick";

export default function ComponentSection() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="section-container">
      <div className="section-content">
        <div className="section-title">
          <span>Chuyên khoa phổ biến </span>
          <button>XEM THÊM</button>
        </div>
        <div className="section-slice">
          <Slider {...settings}>
            <div className="section-slice-child d-flex gap-3">
              {/* options 1 */}
              <div className="option-child">
                <div></div>
                <p>Cơ xương 1</p>
              </div>
              {/* options 2 */}
              <div className="option-child">
                <div></div>
                <p>Cơ xương 2</p>
              </div>
              {/* options 3 */}
              <div className="option-child">
                <div></div>
                <p>Cơ xương 3</p>
              </div>
              {/* options 4 */}
              <div className="option-child">
                <div></div>
                <p>Cơ xương 4</p>
              </div>
            </div>
            <div className="section-slice-child d-flex gap-3">
              {/* options 1 */}
              <div className="option-child">
                <div></div>
                <p>Cơ xương 1</p>
              </div>
              {/* options 2 */}
              <div className="option-child">
                <div></div>
                <p>Cơ xương 2</p>
              </div>
              {/* options 3 */}
              <div className="option-child">
                <div></div>
                <p>Cơ xương 3</p>
              </div>
              {/* options 4 */}
              <div className="option-child">
                <div></div>
                <p>Cơ xương 4</p>
              </div>
            </div>
            <div className="section-slice-child d-flex gap-3">
              {/* options 1 */}
              <div className="option-child">
                <div></div>
                <p>Cơ xương 1</p>
              </div>
              {/* options 2 */}
              <div className="option-child">
                <div></div>
                <p>Cơ xương 2</p>
              </div>
              {/* options 3 */}
              <div className="option-child">
                <div></div>
                <p>Cơ xương 3</p>
              </div>
              {/* options 4 */}
              <div className="option-child">
                <div></div>
                <p>Cơ xương 4</p>
              </div>
            </div>
            <div className="section-slice-child d-flex gap-3">
              {/* options 1 */}
              <div className="option-child">
                <div></div>
                <p>Cơ xương 1</p>
              </div>
              {/* options 2 */}
              <div className="option-child">
                <div></div>
                <p>Cơ xương 2</p>
              </div>
              {/* options 3 */}
              <div className="option-child">
                <div></div>
                <p>Cơ xương 3</p>
              </div>
              {/* options 4 */}
              <div className="option-child">
                <div></div>
                <p>Cơ xương 4</p>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}

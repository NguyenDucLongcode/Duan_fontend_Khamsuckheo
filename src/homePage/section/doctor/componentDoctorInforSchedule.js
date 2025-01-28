import { useGetTableDoctorInforByIdQuery } from "../../../redux/SliceApi/doctorApiSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "./componentDoctorInforSchedule.scss";
import { doctorInforSchedule } from "../../../redux/Slice/doctor";
import { useDispatch } from "react-redux";

const DoctorInforSchedule = (props) => {
  const { id } = useParams();
  const { doctorId } = props;
  const dispatch = useDispatch();
  const { data: dataDocTorInforSchedule } = useGetTableDoctorInforByIdQuery(
    doctorId ? doctorId : id
  );
  const [isHideShowTable, setIsHideShowTable] = useState(false);

  if (dataDocTorInforSchedule && dataDocTorInforSchedule?.data) {
    dispatch(doctorInforSchedule(dataDocTorInforSchedule?.data));
  }

  return (
    <div className="doctorInforSchedule-container">
      <div className="infor-content">
        <span>Địa chỉ khám</span>
        <span>{dataDocTorInforSchedule?.data?.nameClinic}</span>
        <em>{dataDocTorInforSchedule?.data?.addressClinic}</em>
      </div>
      <hr />
      <div className="prince-content">
        <div className="placeholder-prince">
          <span>Giá khám:</span>
          {!isHideShowTable ? (
            <span onClick={() => setIsHideShowTable(true)}>Xem chi tiết</span>
          ) : (
            <></>
          )}
        </div>
        {isHideShowTable ? (
          <div className="prince-box">
            <div className="prince-infor">
              <span>Gia khám: </span>
              <span>{`${dataDocTorInforSchedule?.data?.pricedData?.valueVi}đ`}</span>
            </div>
            <div className="prince-box-pay">
              <p>
                Người bệnh có thể thanh toán bằng hình thức:
                {dataDocTorInforSchedule?.data?.paymentId === "PAY3" ? (
                  <>Tiềm mặt hoặc quẹt thẻ</>
                ) : (
                  <>{dataDocTorInforSchedule?.data?.paymentData?.valueVi}</>
                )}
              </p>
            </div>
            <div className="prince-box-note">
              <em>* Ghi chú: {dataDocTorInforSchedule?.data?.note}</em>
            </div>
            <span
              className="hide-princeTable"
              onClick={() => setIsHideShowTable(false)}
            >
              Ẩn bảng giá
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default DoctorInforSchedule;

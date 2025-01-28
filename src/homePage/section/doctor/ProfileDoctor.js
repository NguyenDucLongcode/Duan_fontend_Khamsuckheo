import { FaMapMarkerAlt } from "react-icons/fa";
import "./ProfileDoctor.scss";
import { format } from "date-fns";
import { PiCalendarCheckDuotone } from "react-icons/pi";
import { CiHospital1 } from "react-icons/ci";
import {
  useGetDoctorByIdQuery,
  useGetTableDoctorInforByIdQuery,
} from "../../../redux/SliceApi/doctorApiSlice";

import { useNavigate } from "react-router";
const ProfileDoctor = (props) => {
  let navigate = useNavigate();

  const { dataTime, label, doctorId, typeComponent } = props;

  const { data: doctorSchedule } = useGetDoctorByIdQuery(doctorId);
  const { data: doctorInforSchedule } =
    useGetTableDoctorInforByIdQuery(doctorId);

  const formattedDate = dataTime?.date
    ? format(new Date(Number(dataTime.date)), "dd/MM/yyyy")
    : "Ngày không hợp lệ";
  return (
    <>
      <div className="profile-content">
        <div className="avatar">
          <img src={doctorSchedule?.data?.image} alt="avatar" />
        </div>

        <div className="introduce">
          <span className="intro-name">
            {`${doctorSchedule?.data?.positionData?.valueVi}, ${doctorSchedule?.data?.firstName} ${doctorSchedule?.data?.lastName}`}
          </span>

          {typeComponent === "detailSpecialty" ? (
            <div className="intro description mt-2">
              <span>{doctorSchedule?.data?.MarkdownData?.description}</span>
            </div>
          ) : (
            <div className="intro calendar">
              <PiCalendarCheckDuotone className="calendar-icon" />
              <span>{`${dataTime?.timeTypeValue?.valueVi} - ${label} ${formattedDate}`}</span>
            </div>
          )}
          {typeComponent === "detailSpecialty" ? (
            <div className="intro addressDoctor mt-2">
              <FaMapMarkerAlt className="address-icon" />
              <span>{doctorInforSchedule?.data?.provinceData?.valueVi}</span>
            </div>
          ) : (
            <>
              <div className="intro hospital">
                <CiHospital1 className="hospital-icon" />
                <span>{doctorInforSchedule?.data?.nameClinic}</span>
              </div>
              <span className="intro-address">
                {doctorInforSchedule?.data?.addressClinic}
              </span>
            </>
          )}
        </div>
      </div>
      {typeComponent === "detailSpecialty" ? (
        <div
          className="detail-info ms-3 "
          style={{ color: "rgb(77, 77, 251)", cursor: "pointer" }}
        >
          <span
            onClick={() => {
              navigate(`/doctor/${doctorId}`);
            }}
          >
            Xem thêm
          </span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default ProfileDoctor;

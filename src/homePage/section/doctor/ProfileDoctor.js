import { useSelector } from "react-redux";
import "./ProfileDoctor.scss";
import { format } from "date-fns";
import { PiCalendarCheckDuotone } from "react-icons/pi";
import { CiHospital1 } from "react-icons/ci";
const ProfileDoctor = (props) => {
  const { dataTime, label } = props;
  const doctorSchedule = useSelector((state) => state.doctor.doctorSchedule);
  const doctorInforSchedule = useSelector(
    (state) => state.doctor.doctorInforSchedule
  );
  const formattedDate = dataTime?.date
    ? format(new Date(Number(dataTime.date)), "dd/MM/yyyy")
    : "Ngày không hợp lệ";

  return (
    <div className="profile-content">
      <div className="avatar">
        <img src={doctorSchedule?.image} alt="avatar" />
      </div>
      <div className="introduce">
        <span>
          {`${doctorSchedule?.positionData?.valueVi}, ${doctorSchedule?.firstName} ${doctorSchedule?.lastName}`}
        </span>
        <div className="intro calendar">
          <PiCalendarCheckDuotone className="calendar-icon" />
          <span>{`${dataTime?.timeTypeValue?.valueVi} - ${label} ${formattedDate}`}</span>
        </div>
        <div className="intro hospital">
          <CiHospital1 className="hospital-icon" />
          <span>{doctorInforSchedule?.nameClinic}</span>
        </div>
        <span className="intro-address">
          {doctorInforSchedule?.addressClinic}
        </span>
      </div>
    </div>
  );
};
export default ProfileDoctor;

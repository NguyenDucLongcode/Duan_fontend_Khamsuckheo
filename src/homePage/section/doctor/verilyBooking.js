import { useLocation } from "react-router-dom";
import { useVerifyBookingAppointmentMutation } from "../../../redux/SliceApi/patientSliceApi";
import { useEffect, useState } from "react";

const VerifyBooking = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const doctorId = queryParams.get("doctorId");
  const [loading, setLoading] = useState(true);
  const data = {
    token: token,
    doctorId: doctorId,
  };

  const [verifyBookingAppointment] = useVerifyBookingAppointmentMutation(data);

  const fetchData = async () => {
    let res = await verifyBookingAppointment(data).unwrap();

    if (res.errCode === 3) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="text-center mt-5 fs-4 fw-bolder">
      {loading === true ? (
        <span>XÁC NHẬN LỊCH HẸN THÀNH CÔNG!</span>
      ) : (
        <span>Lịch hẹn không có hoặc đã được xác nhận</span>
      )}
    </div>
  );
};
export default VerifyBooking;

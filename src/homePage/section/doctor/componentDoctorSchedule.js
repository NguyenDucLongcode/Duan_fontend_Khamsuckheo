import "./componentDoctorSchedule.scss";
import { FaRegCalendarAlt, FaRegHandPointUp } from "react-icons/fa";
import { useState } from "react";
import { format, getTime, addDays } from "date-fns";
import { useParams } from "react-router-dom";
import { useGetDoctorScheduleByIdQuery } from "../../../redux/SliceApi/doctorApiSlice";
import DoctorModal from "./doctorModal/DoctorModal";

const DoctorSchedule = () => {
  const { id } = useParams();
  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");
  const currentDayIndex = today.getDay(); // 0 (Chủ nhật) đến 6 (Thứ 7)
  const todayTimestamp = getTime(formattedDate); // Lấy timestamp của ngày hiện tại

  const daysOfWeek = [
    { label: "Chủ nhật: ", day: 0 },
    { label: "Thứ 2: ", day: 1 },
    { label: "Thứ 3: ", day: 2 },
    { label: "Thứ 4: ", day: 3 },
    { label: "Thứ 5:", day: 4 },
    { label: "Thứ 6: ", day: 5 },
    { label: "Thứ 7: ", day: 6 },
  ];

  // Tạo danh sách 5 ngày bắt đầu từ hôm nay
  const reorderedDays = [];
  for (let i = 0; i < 5; i++) {
    const dayIndex = (currentDayIndex + i) % 7; // Quay vòng các ngày trong tuần
    reorderedDays.push(daysOfWeek[dayIndex]);
  }

  const [selectedDate, setSelectedDate] = useState(todayTimestamp);
  const [selectedLabel, setSelectedLabel] = useState(reorderedDays[0].label);
  const [dataTime, setDataTime] = useState();
  const { data: dataDoctorById } = useGetDoctorScheduleByIdQuery({
    id: id,
    date: selectedDate,
  });

  const handleSelectChange = (event) => {
    const selectedOption = event.target.selectedOptions[0];
    setSelectedDate(event.target.value); // Lưu giá trị được chọn (timestamp)
    setSelectedLabel(selectedOption.getAttribute("data-label"));
  };

  const handleShowModalDoctor = (dataTime) => {
    // show modal doctor
    setDataTime(dataTime);
    const modalDoctor = document.getElementById("staticBackdrop");
    const bootstrapModal = new window.bootstrap.Modal(modalDoctor);
    bootstrapModal.show();
  };

  return (
    <div className="doctorSchedule-container">
      <div className="doctorSchedule-select">
        <select defaultValue={todayTimestamp} onChange={handleSelectChange}>
          {reorderedDays.map((day, index) => {
            const dayDate = addDays(today, index);
            const formattedDate = format(dayDate, "yyyy-MM-dd");
            const showFormattedDate = format(dayDate, "dd/MM/yyyy");
            const timestamp = getTime(formattedDate);

            return (
              <option key={day.day} value={timestamp} data-label={day.label}>
                {day.label} {showFormattedDate}
              </option>
            );
          })}
        </select>
      </div>
      <div className="schedule-content">
        <div className="title">
          <FaRegCalendarAlt className="calendar-icon" />
          <span>Lịch khám</span>
        </div>

        <div className="schedule-time">
          {dataDoctorById?.data && dataDoctorById?.data.length > 0 ? (
            <>
              {dataDoctorById &&
                dataDoctorById?.data &&
                dataDoctorById?.data.map((item, index) => {
                  return (
                    <button
                      key={`${index}-doctorSchedule`}
                      onClick={() => {
                        handleShowModalDoctor(item);
                      }}
                    >
                      {item?.timeTypeValue?.valueVi}
                    </button>
                  );
                })}
            </>
          ) : (
            <>
              <span className="title-empty">Lịch trống</span>
            </>
          )}
        </div>
        <div className="title-bottom">
          <span>Chọn</span>
          <FaRegHandPointUp className="title-bottom-icon" />
          <span>{`và đặt (phí đặt lịch 0đ)`}</span>
        </div>
      </div>
      <DoctorModal dataTime={dataTime} label={selectedLabel} />
    </div>
  );
};

export default DoctorSchedule;

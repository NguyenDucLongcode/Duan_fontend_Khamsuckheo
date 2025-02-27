import DatePicker from "react-datepicker";
import { useState } from "react";
import "./dateTable.scss";
import { format, getTime } from "date-fns";
import { useDispatch } from "react-redux";
import { timeSchedule } from "../../../redux/Slice/schedule";

const DatePickerTable = (props) => {
  const { type } = props;
  const [startDate, setStartDate] = useState(null);
  const formattedDate = format(startDate, "yyyy-MM-dd");
  // Timestamp dạng milliseconds
  const timestampMilliseconds = getTime(formattedDate);
  // redux
  const dispatch = useDispatch();

  if (formattedDate) {
    dispatch(timeSchedule(timestampMilliseconds));
  }
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)} // Cập nhật ngày được chọn
        dateFormat="dd/MM/yyyy" // Định dạng ngày
        placeholderText="Chọn ngày" // Văn bản placeholder
        minDate={type === "ManagerPicker" ? new Date() : ""}
      />
    </>
  );
};
export default DatePickerTable;

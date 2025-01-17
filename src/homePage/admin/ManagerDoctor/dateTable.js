import DatePicker from "react-datepicker";
import { useState } from "react";
import "./dateTable.scss";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { timeSchedule } from "../../../redux/Slice/schedule";

const DateTable = () => {
  const [startDate, setStartDate] = useState(null);
  const formattedDate = format(startDate, "dd/MM/yyyy");
  // redux
  const dispatch = useDispatch();

  if (formattedDate) {
    dispatch(timeSchedule(formattedDate));
  }

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)} // Cập nhật ngày được chọn
        dateFormat="dd/MM/yyyy" // Định dạng ngày
        placeholderText="Chọn ngày" // Văn bản placeholder
      />
    </>
  );
};
export default DateTable;

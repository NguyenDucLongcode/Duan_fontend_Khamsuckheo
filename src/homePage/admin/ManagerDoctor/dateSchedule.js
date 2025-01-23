import "./dateSchedule.scss";
import Select from "react-select";
import { useState, useEffect } from "react";
import DatePickerTable from "./DatePicker";
import { useGetAllCodeTimeQuery } from "../../../redux/SliceApi/allCodeApi";
import { memo } from "react";
import { useSelector } from "react-redux";
import { useCreateDoctorScheduleMutation } from "../../../redux/SliceApi/doctorApiSlice";
import { toast } from "react-toastify";

const DateSchedule = (props) => {
  const { dataAllDoctors } = props;
  //state
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [dataScheduleSummit, setDataScheduleSummit] = useState([]);
  // redux
  const [createDoctorSchedule] = useCreateDoctorScheduleMutation();
  const { data: dataTime } = useGetAllCodeTimeQuery("TIME");
  const [valueSchedule, setValueSchedule] = useState([]);
  const date = useSelector((state) => state.schedule.timeSchedule);

  // logic functions
  const handleGetValue = (key) => {
    setValueSchedule((prev) =>
      prev.includes(key) ? prev.filter((i) => i !== key) : [...prev, key]
    );
  };

  const handleClickSummit = async () => {
    // validate
    if (!selectedOption) {
      toast.error("please choose doctor");
    }
    if (!date) {
      toast.error("please choose date");
    }
    console.log(">>> ", valueSchedule);
    if (!valueSchedule.length > 0) {
      toast.error("please choose at least  a schedule");
    }
    // call api
    try {
      const response = await createDoctorSchedule(dataScheduleSummit).unwrap();
      if (response.errCode === 0) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error creating doctor schedule", error);
    }

    setDataScheduleSummit([]);
  };
  useEffect(() => {
    if (dataAllDoctors) {
      setOptions(
        dataAllDoctors.map((user, index) => ({
          value: user.id,
          label: `${index + 1} - ${user.positionData.valueVi}, ${
            user.firstName
          } ${user.lastName}`,
        }))
      );
    }
  }, [dataAllDoctors]);

  useEffect(() => {
    setDataScheduleSummit([
      ...valueSchedule.map((item) => ({
        doctorId: selectedOption.value,
        date: date,
        timeType: item,
      })),
    ]);
  }, [valueSchedule, selectedOption?.value, date]);

  return (
    <div className="dateSchedule-container">
      <p className="title">Kế hoạch quản lý khám bệnh của bác sĩ </p>
      <div className="selectInput-content">
        <div className="content-right">
          <span>Chọn bác sĩ</span>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div className="content-left">
          <p className="content-left-title">Chọn ngày khám</p>
          <DatePickerTable className="dateTable" />
        </div>
      </div>
      <div className="schedule-content">
        {dataTime?.data &&
          dataTime?.data.map((item) => {
            const isActive = valueSchedule.includes(item.key);
            return (
              <button
                key={`${item.id}-schedule`}
                className={`btn ${isActive ? "active" : ""}`}
                onClick={() => handleGetValue(item.key)}
              >
                {item.valueVi}
              </button>
            );
          })}
      </div>
      <button className="btn btn-warning" onClick={handleClickSummit}>
        Lưu thông tin
      </button>
    </div>
  );
};
export default memo(DateSchedule);

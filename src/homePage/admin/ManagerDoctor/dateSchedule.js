import "./dateSchedule.scss";
import Select from "react-select";
import { useState, useEffect } from "react";
import DateTable from "./dateTable";
import { useGetAllCodeTimeQuery } from "../../../redux/SliceApi/allCodeApi";
import { memo } from "react";
import { useSelector } from "react-redux";

const DateSchedule = (props) => {
  const { dataAllDoctors } = props;
  //state
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [dataScheduleSummit, setDataScheduleSummit] = useState([]);
  // redux
  const { data: dataTime } = useGetAllCodeTimeQuery("TIME");
  const [valueSchedule, setValueSchedule] = useState([]);
  const date = useSelector((state) => state.schedule.timeSchedule);

  // logic functions
  const handleGetValue = (key) => {
    setValueSchedule((prev) =>
      prev.includes(key) ? prev.filter((i) => i !== key) : [...prev, key]
    );
  };

  const handleClickSummit = () => {
    setDataScheduleSummit([
      ...dataScheduleSummit,
      ...valueSchedule.map((item) => ({
        doctorId: selectedOption.value,
        date: date,
        time: item,
      })),
    ]);
  };
  console.log(">>", dataScheduleSummit);

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
          <DateTable className="dateTable" />
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

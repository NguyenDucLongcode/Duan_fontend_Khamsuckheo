import "./scss/detailSpecialty.scss";
import ProfileDoctor from "../doctor/ProfileDoctor";
import DoctorInforSchedule from "../doctor/componentDoctorInforSchedule";
import {
  useGetDoctorByIdSpecialistQuery,
  useGetSpecialistsByIdQuery,
} from "../../../redux/SliceApi/specialistApi";
import DoctorSchedule from "../doctor/componentDoctorSchedule";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import { useGetAllCodeTimeQuery } from "../../../redux/SliceApi/allCodeApi";
import Select from "react-select";

const DetailSpecialty = () => {
  let typeComponent = "detailSpecialty";
  const { id } = useParams();
  const [isShowHide, setIsShowHide] = useState(false);
  const [selectedOptionProvince, setSelectedOptionProvince] = useState({
    value: "all",
    label: "Tất cả",
  });

  const { data: dataProvinceAllCode } = useGetAllCodeTimeQuery("PROVINCE");
  const { data: inforSpecialist } = useGetSpecialistsByIdQuery(id);
  const {
    data: dataDoctorById,
    error,
    isLoading,
  } = useGetDoctorByIdSpecialistQuery({
    id: id,
    type: selectedOptionProvince?.value,
  });

  const [optionsProvince, setOptionsProvince] = useState({
    value: "all",
    label: "Tất cả",
  });
  useEffect(() => {
    if (dataProvinceAllCode?.data?.length) {
      setOptionsProvince([
        { value: "all", label: "Tất cả" },
        ...dataProvinceAllCode.data.map((item) => ({
          value: item.key,
          label: item.valueVi,
        })),
      ]);
    }
  }, [dataProvinceAllCode]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;

  return (
    <div className="detailSpecialty-container">
      <div className="information-specialty">
        <p className="specialist-name">{inforSpecialist?.data?.name}</p>
        <p className="specialist-title">{`Bác sĩ ${inforSpecialist?.data?.name} giỏi`}</p>

        <div
          className="infor-markdown"
          style={{ height: !isShowHide ? "260px" : "100%" }}
        >
          <ReactMarkdown>
            {inforSpecialist?.data?.descriptionMarkdown}
          </ReactMarkdown>
        </div>
        <span
          className="detailInfor ms-4 mt-3"
          onClick={() => {
            setIsShowHide(!isShowHide);
          }}
        >
          Xem thêm
        </span>
      </div>
      <div className="input-Province col-2">
        <label>Chọn tỉnh thành</label>
        <Select
          value={selectedOptionProvince}
          onChange={setSelectedOptionProvince}
          options={optionsProvince}
        />
      </div>
      <div className="inforDoctorSchedule-content">
        {dataDoctorById?.data.length > 0 ? (
          <>
            {dataDoctorById?.data &&
              dataDoctorById?.data.map((item, index) => {
                return (
                  <div
                    key={`${index}-infor-scheduleDoctor`}
                    className="information-scheduleDoctor"
                  >
                    <div className="content-left">
                      <ProfileDoctor
                        doctorId={item.doctorId}
                        typeComponent={typeComponent}
                      />
                    </div>
                    <div className="content-right">
                      <div className="doctorSchedule">
                        <DoctorSchedule doctorId={item.doctorId} />
                      </div>
                      <hr />
                      <div className="doctorInforSchedule">
                        <DoctorInforSchedule doctorId={item.doctorId} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </>
        ) : (
          <div className="noDoctor-content">
            <span>{`Không có phòng khám nào tại ${selectedOptionProvince?.label}`}</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default DetailSpecialty;

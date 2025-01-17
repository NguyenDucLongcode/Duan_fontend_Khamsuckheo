import AddInfoDoctor from "./addInfoDoctor";
import { useGetAllDoctorQuery } from "../../../redux/SliceApi/doctorApiSlice";
import DateSchedule from "./dateSchedule";

const ManagerDoctor = () => {
  const { data: dataAllDoctors } = useGetAllDoctorQuery();
  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            Thêm thông tin bác sĩ
          </button>
          <button
            className="nav-link"
            id="nav-contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-contact"
            type="button"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            Quản lý kế hoạch khám bệnh bác sĩ
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <AddInfoDoctor dataAllDoctors={dataAllDoctors} />
        </div>
        <div
          className="tab-pane fade"
          id="nav-contact"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
        >
          <DateSchedule dataAllDoctors={dataAllDoctors?.data} />
        </div>
      </div>
    </>
  );
};
export default ManagerDoctor;

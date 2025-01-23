import { useParams } from "react-router-dom";
import { useGetDoctorByIdQuery } from "../../../redux/SliceApi/doctorApiSlice";
import "./detailDoctor.scss";
import ReactMarkdown from "react-markdown";
import DoctorSchedule from "./componentDoctorSchedule";
import DoctorInforSchedule from "./componentDoctorInforSchedule";
import { useDispatch } from "react-redux";
import { doctorSchedule } from "../../../redux/Slice/doctor";

const DetailDoctor = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: dataDoctorById } = useGetDoctorByIdQuery(id);

  if (dataDoctorById && dataDoctorById?.data) {
    dispatch(doctorSchedule(dataDoctorById?.data));
  }

  return (
    <div className="detailDoctor-container">
      {/* information */}
      <div className="infoDoctor">
        <div className="content-left">
          <img
            src={dataDoctorById?.data?.image}
            alt="logo"
            className="avatar"
          />
        </div>
        <div className="content-right">
          <strong>
            {`${dataDoctorById?.data?.positionData?.valueVi}, ${dataDoctorById?.data?.firstName} ${dataDoctorById?.data?.lastName}`}
          </strong>
          <p>{dataDoctorById?.data?.MarkdownData?.description}</p>
        </div>
      </div>
      {/* doctor schedule */}
      <div className="doctorSchedule">
        <div className="content-left">
          <DoctorSchedule />
        </div>

        <div className="content-right">
          <DoctorInforSchedule />
        </div>
      </div>
      {/* markdown content */}
      <div className="markdown-container">
        <ReactMarkdown>
          {dataDoctorById?.data?.MarkdownData?.contentMarkdown}
        </ReactMarkdown>
      </div>
      {/* comment */}
      <div className="comment-container">
        <h2>Phản hồi của bệnh nhân sau khi khám</h2>
        <div className="comment-content"></div>
      </div>
    </div>
  );
};
export default DetailDoctor;

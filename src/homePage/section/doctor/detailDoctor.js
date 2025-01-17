import { useParams } from "react-router-dom";
import { useGetDoctorByIdQuery } from "../../../redux/SliceApi/doctorApiSlice";
import "./detailDoctor.scss";
import ReactMarkdown from "react-markdown";

const DetailDoctor = () => {
  const { id } = useParams();
  const { data: dataDoctor } = useGetDoctorByIdQuery(id);

  console.log(">>> check id ", dataDoctor?.data);

  return (
    <div className="detailDoctor-container">
      <div className="infoDoctor">
        <div className="content-left">
          <img src={dataDoctor?.data?.image} alt="logo" className="avatar" />
        </div>
        <div className="content-right">
          <strong>
            {`${dataDoctor?.data?.positionData?.valueVi}, ${dataDoctor?.data?.firstName} ${dataDoctor?.data?.lastName}`}
          </strong>
          <p>{dataDoctor?.data?.MarkdownData?.description}</p>
        </div>
      </div>
      <div className="markdown-container">
        <ReactMarkdown>
          {dataDoctor?.data?.MarkdownData?.contentMarkdown}
        </ReactMarkdown>
      </div>
      <div className="comment-container">
        <h2>Phản hồi của bệnh nhân sau khi khám</h2>
        <div className="comment-content"></div>
      </div>
    </div>
  );
};
export default DetailDoctor;

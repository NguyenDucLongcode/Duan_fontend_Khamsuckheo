import "./addInfoDoctor.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Select from "react-select";
import { useState, useEffect } from "react";
import { useCreateDoctorMutation } from "../../../redux/SliceApi/doctorApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddInfoDoctor = (props) => {
  const mdParser = new MarkdownIt();
  // redux
  const { dataAllDoctors } = props;
  const [createDoctor] = useCreateDoctorMutation();
  const user = useSelector((state) => state.user.userInfor);
  const isRole = user?.roleId;
  const isDoctorIdRedux = user?.id;

  // state
  const [selectedOption, setSelectedOption] = useState(null);
  const [getDataInput, setGetDataInput] = useState({
    doctorId: "",
    contentHTML: "",
    contentMarkdown: "",
    description: "",
    specialistId: null,
    clinicId: null,
  });
  const [options, setOptions] = useState([]);

  // logic function
  const handleEditorChange = ({ html, text }) => {
    setGetDataInput({
      ...getDataInput,
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  const handleDesChange = (event) => {
    setGetDataInput({
      ...getDataInput,
      description: event.target.value,
    });
  };

  const handleSummit = async () => {
    if (user?.roleId === "R2") {
      setGetDataInput({ ...getDataInput, doctorId: isDoctorIdRedux });
    }
    try {
      const res = await createDoctor(getDataInput).unwrap();
      console.log(res);
      if (res.errCode === 0) {
        toast.success(res.message);
      } else {
        // alert(res.message);
        toast.error(res.message);
      }
    } catch (error) {
      console.log("Error creating doctor: ", error);
    }
    console.log(getDataInput);
  };

  useEffect(() => {
    if (dataAllDoctors?.data && dataAllDoctors?.data) {
      setOptions(
        dataAllDoctors.data?.map((user, index) => ({
          value: user.id,
          label: `${index + 1} - ${user.positionData.valueVi}, ${
            user.firstName
          } ${user.lastName}`,
        }))
      );
    }
  }, [dataAllDoctors]);

  useEffect(() => {
    if (selectedOption) {
      setGetDataInput({ ...getDataInput, doctorId: selectedOption?.value });
    }
  }, [selectedOption]);

  return (
    <div className="ManagerDocTor-container">
      <div className="title">Tạo thêm thông tin Bác sĩ</div>
      <div className="content-top">
        {isRole !== "R2" ? (
          <>
            <div className="selector-doctor">
              <p>Chọn bác sĩ</p>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="introduce-doctor">
          <p>Thông tin giới thiệu</p>
          <textarea rows="4" cols="50" onChange={handleDesChange}></textarea>
        </div>
      </div>
      <div className="content-bottom">
        <div className="markdown">
          <MdEditor
            style={{ height: "314px" }}
            renderHTML={(text) => mdParser.render(text)}
            name="MdEditor"
            onChange={handleEditorChange}
          />
        </div>
        <button className="btn btn-warning mt-3" onClick={handleSummit}>
          Lưu thông tin
        </button>
      </div>
    </div>
  );
};
export default AddInfoDoctor;

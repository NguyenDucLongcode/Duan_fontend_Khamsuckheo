import "./scss/ManagerClinic.scss";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { fileToBase64, useLightbox } from "../../../utilities/Common";
import { useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { useCreateNewClinicMutation } from "../../../redux/SliceApi/clinicApi";

const ManagerClinic = () => {
  const mdParser = new MarkdownIt();
  const [createNewClinic] = useCreateNewClinicMutation();
  // states
  const [dataInputUser, setDataInputUser] = useState({
    name: "",
    image: "",
    descriptionHTML: "",
    descriptionMarkdown: "",
    address: "",
  });
  const [previewImageBase64, setPreviewImageBase64] = useState("");
  // use lightbox
  const slides = [
    {
      src: previewImageBase64,
    },
  ];
  const { setOpen, LightboxComponent } = useLightbox(slides);

  // handler
  const handleEditorChange = ({ html, text }) => {
    setDataInputUser((prev) => ({
      ...prev,
      descriptionHTML: html,
      descriptionMarkdown: text,
    }));
  };
  const getInputImage = async (event) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const file = event.target.files[0];
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        toast.error("Chỉ chấp nhận các tệp ảnh (.jpg, .png, .gif).");
        return;
      }
      const base64 = await fileToBase64(file);
      setPreviewImageBase64(base64);
      setDataInputUser({ ...dataInputUser, image: base64 });
    }
  };
  const handleSubmit = async () => {
    // validate
    if (
      !dataInputUser?.name ||
      !dataInputUser?.descriptionMarkdown ||
      !dataInputUser?.descriptionHTML
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (!dataInputUser?.image) {
      toast.error("Vui lòng chọn ảnh!");
      return;
    }
    console.log("check data input ", dataInputUser);

    let res = await createNewClinic(dataInputUser).unwrap();
    if (res.errCode === 0) {
      toast.success(res.message);
      setDataInputUser({
        name: "",
        image: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        address: "",
      });
      setPreviewImageBase64("");
    } else {
      toast.error(res.message);
    }
  };
  console.log("check data input ", dataInputUser);

  return (
    <div className="managerClinic-container">
      <p className="title">Quản lý phòng khám</p>
      <div className="content-top">
        <div className="form-floating mb-3 col-5">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={dataInputUser.name}
            onChange={(event) =>
              setDataInputUser({ ...dataInputUser, name: event.target.value })
            }
          />
          <label htmlFor="floatingInput">Tên chuyên khoa</label>
        </div>
        <div className="updateFile-clinic">
          {/* Upload Image */}
          <div className="form-group field-image">
            <label htmlFor="fileInputCreate" style={{ cursor: "pointer" }}>
              <FaCloudUploadAlt className="icon-upLoad_image" />
              Upload Avatar
            </label>
            <input
              type="file"
              id="fileInputCreate"
              style={{ display: "none" }}
              onChange={getInputImage}
            />
            <div className="preview_image">
              {previewImageBase64 ? (
                <span>
                  <img
                    src={previewImageBase64}
                    alt="Preview_image"
                    onClick={() => setOpen(true)}
                  />
                </span>
              ) : (
                "Preview image"
              )}
            </div>
          </div>
        </div>
      </div>
      {/* address */}
      <div className="form-floating mb-3 col-5">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          value={dataInputUser.address}
          onChange={(event) =>
            setDataInputUser({ ...dataInputUser, address: event.target.value })
          }
        />
        <label htmlFor="floatingInput">Địa chỉ</label>
      </div>
      <div className="content-bottom">
        <div className="markdown">
          <MdEditor
            style={{ height: "314px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            value={dataInputUser.descriptionMarkdown}
          />
        </div>
        <button className="btn btn-primary mt-4" onClick={handleSubmit}>
          Save
        </button>
      </div>
      {LightboxComponent()}
    </div>
  );
};
export default ManagerClinic;

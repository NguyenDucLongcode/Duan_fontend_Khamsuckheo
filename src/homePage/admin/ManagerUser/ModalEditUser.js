import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  useUpdateUserMutation,
  useGetAllUsersQuery,
} from "../../../redux/SliceApi/userApiSlice";
import "./ModalEditUser.scss";
import { toast } from "react-toastify";
import { fileToBase64, useLightbox } from "../../../utilities/Common";
import { FaCloudUploadAlt } from "react-icons/fa";

const ModalEditUser = (props) => {
  // props.
  const { ROLE, GENDER, POSITION } = useSelector((state) => state.AllCode);
  const { userId, dataUserById, refetchUsersById } = props;

  // redux logic
  const [updateUser] = useUpdateUserMutation();
  const { refetch } = useGetAllUsersQuery();

  //  state
  const [dataInputUser, setDataInputUser] = useState({});
  const getInputDataUser = (event, type) => {
    const { name, value } = event.target;
    setDataInputUser({ ...dataInputUser, [name]: value });
  };
  // use lightbox
  const [previewImageBase64, setPreviewImageBase64] = useState(
    dataUserById?.users?.image
  );
  const slides = [
    {
      src: previewImageBase64,
    },
  ];
  const { setOpen, LightboxComponent } = useLightbox(slides);

  // data fields input
  const formFields = [
    {
      id: "email",
      type: "email",
      label: "Email",
      placeholder: "No hidden",
      disabled: true,
    },
    {
      id: "password",
      type: "password",
      label: "Password",
      disabled: true,
      value: "no hidden",
    },
    {
      id: "firstName",
      type: "text",
      label: "First Name",
      placeholder: dataUserById?.users?.firstName,
      value: dataUserById?.users?.firstName,
    },
    {
      id: "lastName",
      type: "text",
      label: "Last Name",
      placeholder: dataUserById?.users?.lastName,
      value: dataUserById?.users?.lastName,
    },
    {
      id: "phoneNumber",
      type: "number",
      label: "Phone Number",
      placeholder: dataUserById?.users?.phoneNumber,
      value: dataUserById?.users?.phoneNumber,
    },
    {
      id: "address",
      type: "text",
      label: "Address",
      placeholder: dataUserById?.users?.address,
      value: dataUserById?.users?.address,
    },
  ];

  // handle change image
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

  const hideModel = () => {
    const modalElement = document.getElementById("staticBackdrop");
    const bootstrapModal = new window.bootstrap.Modal(modalElement);
    modalElement.classList.remove("show");
    bootstrapModal.hide();
    const backdropElement = document.querySelector(".modal-backdrop");
    if (backdropElement) backdropElement.remove(); // Xóa lớp phủ nền
    modalElement.style.display = "none"; // Ẩn modal
  };

  const handleSubmit = async () => {
    // validate
    if (
      dataInputUser.phoneNumber.length > 11 ||
      dataInputUser.phoneNumber.length < 10
    ) {
      toast.error("Số điện thoại phải 10 hoặc 11 số!");
      return;
    }
    let response = await updateUser(dataInputUser).unwrap();
    if (response.errCode === 0) {
      toast.success(response.message);
      refetch();
      refetchUsersById();
      // close modal
      hideModel();
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (dataUserById?.users) {
      setDataInputUser({
        id: userId,
        ...dataUserById?.users,
      });
      setPreviewImageBase64(dataUserById.users.image);
    }
  }, [userId, dataUserById]);

  return (
    <div className="modelEdi-container">
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit user
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modalEditUser-body">
              {/* body */}
              <div className="form-container">
                <div className="form-content">
                  <form className="user-form">
                    {/* userName  && password && first,last Name && phoneNumber && address */}
                    <div className="form-grid">
                      {formFields.map((field) => (
                        <div className="form-group" key={field.id}>
                          <label htmlFor={field.id}>{field.label}</label>
                          <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            placeholder={field.placeholder}
                            value={dataInputUser[field.id] || ""}
                            disabled={field.disabled}
                            onChange={getInputDataUser}
                          />
                        </div>
                      ))}
                      {/* Gender */}
                      <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                          id="gender"
                          name="gender"
                          required
                          onChange={getInputDataUser}
                          value={dataInputUser.gender || ""}
                        >
                          <option value="" disabled>
                            Select your gender
                          </option>
                          {GENDER &&
                            GENDER.length > 0 &&
                            GENDER.map((gender, index) => {
                              return (
                                <option
                                  key={`${index} + "gender"`}
                                  value={gender.key}
                                >
                                  {gender.valueEn}
                                </option>
                              );
                            })}
                        </select>
                      </div>

                      {/* "position */}
                      <div className="form-group">
                        <label htmlFor="position">Position</label>
                        <select
                          id="position"
                          name="positionId"
                          required
                          onChange={getInputDataUser}
                          value={dataInputUser.positionId || ""}
                        >
                          <option value="" disabled>
                            Select your position
                          </option>
                          {POSITION &&
                            POSITION.length > 0 &&
                            POSITION.map((position, index) => {
                              return (
                                <option
                                  key={`${index} + "position"`}
                                  value={position.key}
                                >
                                  {position.valueEn}
                                </option>
                              );
                            })}
                        </select>
                      </div>

                      {/* ROLE */}
                      <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select
                          id="role"
                          name="roleId"
                          required
                          onChange={getInputDataUser}
                          value={dataInputUser.roleId || ""}
                        >
                          <option value="" disabled>
                            Select your role
                          </option>
                          {ROLE &&
                            ROLE.length > 0 &&
                            ROLE.map((role, index) => {
                              return (
                                <option
                                  key={`${index} + "role"`}
                                  value={role.key}
                                >
                                  {role.valueEn}
                                </option>
                              );
                            })}
                        </select>
                      </div>

                      {/* Upload Image */}
                      <div className="form-group field-image">
                        <label
                          htmlFor="fileInputImage"
                          style={{ cursor: "pointer" }}
                        >
                          <FaCloudUploadAlt className="icon-upLoad_image" />
                          Upload Avatar
                        </label>
                        <input
                          type="file"
                          id="fileInputImage"
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
                            "No image"
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {LightboxComponent()}
    </div>
  );
};
export default ModalEditUser;

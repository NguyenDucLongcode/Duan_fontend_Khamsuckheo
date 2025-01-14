import "./CreateUser.scss";
import "./CreateUser.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllCode } from "../../../redux/Slice/AllCode";
import { fileToBase64, useLightbox } from "../../../utilities/Common";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
  useCreateUserMutation,
  useGetAllUsersQuery,
} from "../../../redux/SliceApi/userApiSlice";
import { toast } from "react-toastify";

const CreateUser = () => {
  // logic redux
  const dispatch = useDispatch();
  const { ROLE, GENDER, POSITION } = useSelector((state) => state.AllCode);
  const [createUser, { error, isLoading }] = useCreateUserMutation();
  const { refetch } = useGetAllUsersQuery();

  // state
  const [dataInputUser, setDataInputUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    gender: "",
    roleId: "",
    positionId: "",
    image: "",
  });

  const [previewImageBase64, setPreviewImageBase64] = useState("");
  // use lightbox
  const slides = [
    {
      src: previewImageBase64,
    },
  ];
  const { setOpen, LightboxComponent } = useLightbox(slides);

  // dataFields
  const formFields = [
    {
      id: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
    },
    {
      id: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
    },
    {
      id: "firstName",
      type: "text",
      label: "First Name",
      placeholder: "Enter your first name",
    },
    {
      id: "lastName",
      type: "text",
      label: "Last Name",
      placeholder: "Enter your last name",
    },
    {
      id: "phoneNumber",
      type: "number",
      label: "Phone Number",
      placeholder: "Enter your phone number",
    },
    {
      id: "address",
      type: "text",
      label: "Address",
      placeholder: "Enter your address",
    },
  ];

  // handle change input
  const getInputDataUser = (event, type) => {
    const { name, value } = event.target;
    setDataInputUser({ ...dataInputUser, [name]: value });
  };

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
  // handle summit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // validate
    if (
      dataInputUser.phoneNumber.length > 11 ||
      dataInputUser.phoneNumber.length < 10
    ) {
      toast.error("Số điện thoại phải 10 hoặc 11 số!");
      return;
    }
    try {
      const response = await createUser(dataInputUser).unwrap(); // Gửi dữ liệu và nhận phản hồi
      if (response.errCode === 0) {
        toast.success(response.message);
        refetch();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error creating user: ", error);
    }
  };
  useEffect(() => {
    dispatch(fetchAllCode());
  }, []);

  if (error) return <p>Something wrong! please try again!</p>;

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="form-container">
      <div className="form-content">
        <form className="user-form" onSubmit={handleSubmit}>
          <h2>Create a new user</h2>
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
                  required
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
              >
                <option value="" disabled>
                  Select your gender
                </option>
                {GENDER &&
                  GENDER.length > 0 &&
                  GENDER.map((gender, index) => {
                    return (
                      <option key={`${index} + "gender"`} value={gender.key}>
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
              >
                <option value="" disabled>
                  Select your role
                </option>
                {ROLE &&
                  ROLE.length > 0 &&
                  ROLE.map((role, index) => {
                    return (
                      <option key={`${index} + "role"`} value={role.key}>
                        {role.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>

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

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
      {LightboxComponent()}
    </div>
  );
};
export default CreateUser;

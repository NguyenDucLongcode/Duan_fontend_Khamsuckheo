import ProfileDoctor from "../ProfileDoctor";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePickerTable from "../../../admin/ManagerDoctor/DatePicker";
import { useGetAllCodeTimeQuery } from "../../../../redux/SliceApi/allCodeApi";
import { useCreateBookingAppointmentMutation } from "../../../../redux/SliceApi/patientSliceApi";
import { toast } from "react-toastify";
import Select from "react-select";

const DoctorModal = ({ dataTime, label }) => {
  const { id } = useParams();
  const { data: GENDER } = useGetAllCodeTimeQuery("GENDER");
  const [createBookingAppointment] = useCreateBookingAppointmentMutation();

  const initialDataSubmit = {
    email: "",
    doctorId: id || "",
    date: dataTime?.date || "",
    timeType: dataTime?.timeType || "",
    fullName: "",
    phoneNumber: "",
    address: "",
    reason: "",
    birthday: "",
    gender: "",
  };

  const [dataSubmit, setDataSubmit] = useState(initialDataSubmit);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const dateBirthday = useSelector((state) => state.schedule.timeSchedule);
  const doctorInforSchedule = useSelector(
    (state) => state.doctor.doctorInforSchedule
  );

  const handleInputChange = ({ target: { name, value } }) => {
    setDataSubmit((prev) => ({ ...prev, [name]: value }));
  };

  const handleSummit = async () => {
    // validate email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isEmailValid = emailPattern.test(dataSubmit.email);
    if (!isEmailValid) {
      toast.error("Email is not valid.");
      return;
    }
    // validate phone number
    const phonePattern = /^[0-9]{10,11}$/;
    const isPhoneNumberValid = phonePattern.test(dataSubmit.phoneNumber);
    if (!isPhoneNumberValid) {
      toast.error("Phone number is not valid.");
      return;
    }

    try {
      const res = await createBookingAppointment(dataSubmit).unwrap();
      if (res.errCode === 0) {
        toast.success(res.message);
        handleCloseModal();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Error occurred during booking.");
    }
  };

  const handleCloseModal = () => {
    const modalDoctor = document.getElementById("staticBackdrop");
    if (modalDoctor) {
      const bootstrapModal =
        window.bootstrap.Modal.getInstance(modalDoctor) ||
        new window.bootstrap.Modal(modalDoctor);
      bootstrapModal.hide();
    }
    clearForm();
  };

  const clearForm = () => {
    setDataSubmit(initialDataSubmit);
    setSelectedOption(null);
  };

  useEffect(() => {
    if (GENDER?.data) {
      setOptions(
        GENDER.data.map((gender) => ({
          value: gender.key,
          label: gender.valueVi,
        }))
      );
    }
  }, [GENDER]);

  useEffect(() => {
    setDataSubmit((prev) => ({
      ...prev,
      birthday: dateBirthday || "",
      gender: selectedOption?.value || "",
    }));
  }, [dateBirthday, selectedOption]);

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Thông tin đặt lịch khám bệnh
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <ProfileDoctor dataTime={dataTime} label={label} />
            <span>{`Giá khám: ${doctorInforSchedule?.pricedData?.valueVi} đ`}</span>
            <div className="row">
              <div className="col">
                <label htmlFor="nameModalDoctor">Họ tên</label>
                <input
                  type="text"
                  className="form-control"
                  id="nameModalDoctor"
                  name="fullName"
                  value={dataSubmit.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <label htmlFor="phoneModalDoctor">Số điện thoại</label>
                <input
                  type="number"
                  className="form-control"
                  id="phoneModalDoctor"
                  name="phoneNumber"
                  value={dataSubmit.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="emailModalDoctor">Địa chỉ email</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailModalDoctor"
                  name="email"
                  value={dataSubmit.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <label htmlFor="addressModalDoctor">Địa chỉ liên hệ</label>
                <input
                  type="text"
                  className="form-control"
                  id="addressModalDoctor"
                  name="address"
                  value={dataSubmit.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="reasonModalDoctor">Lý do khám</label>
                <input
                  type="text"
                  className="form-control"
                  id="reasonModalDoctor"
                  name="reason"
                  value={dataSubmit.reason}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label>Ngày sinh</label>
                <DatePickerTable />
              </div>
              <div className="col">
                <label htmlFor="genderModalDoctor">Giới tính</label>
                <Select
                  value={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSummit}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorModal;

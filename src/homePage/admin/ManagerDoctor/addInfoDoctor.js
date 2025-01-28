import "./addInfoDoctor.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Select from "react-select";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateDoctorMutation,
  useCreateTableDoctorInfoMutation,
  useGetTableDoctorInforByIdQuery,
  useGetDoctorByIdQuery,
} from "../../../redux/SliceApi/doctorApiSlice";
import { useGetAllCodeTimeQuery } from "../../../redux/SliceApi/allCodeApi";
import { useGetAllSpecialistQuery } from "../../../redux/SliceApi/specialistApi";

const AddInfoDoctor = ({ dataAllDoctors }) => {
  const mdParser = new MarkdownIt();

  // Redux data and mutations
  const { data: dataPriceAllCode } = useGetAllCodeTimeQuery("PRICE");
  const { data: dataPaymentAllCode } = useGetAllCodeTimeQuery("PAYMENT");
  const { data: dataProvinceAllCode } = useGetAllCodeTimeQuery("PROVINCE");
  const { data: dataAllSpecialist } = useGetAllSpecialistQuery();
  const [createDoctor] = useCreateDoctorMutation();
  const [createTableDoctorInfo] = useCreateTableDoctorInfoMutation();

  // User info
  const user = useSelector((state) => state.user.userInfor);
  const isDoctor = user?.roleId === "R2";
  const isDoctorIdRedux = user?.id;

  // States
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionPrice, setSelectedOptionPrice] = useState(null);
  const [selectedOptionPayment, setSelectedOptionPayment] = useState(null);
  const [selectedOptionProvince, setSelectedOptionProvince] = useState(null);
  const [selectedAllSpecialist, setSelectedAllSpecialist] = useState(null);
  const [getDataInput, setGetDataInput] = useState({
    doctorId: "",
    contentHTML: "",
    contentMarkdown: "",
    description: "",
    specialistId: "",
    clinicId: 1,
    priceId: "",
    provinceId: "",
    paymentId: "",
    addressClinic: "",
    nameClinic: "",
    note: "",
  });
  const [options, setOptions] = useState({
    doctors: [],
    prices: [],
    payments: [],
    provinces: [],
    specialists: [],
  });

  // Queries
  const { data: tableDoctorInforById, refresh: refreshTableDoctorInforById } =
    useGetTableDoctorInforByIdQuery(selectedOption?.value, {
      skip: !selectedOption?.value,
      refetchOnMountOrArgChange: true,
    });

  const { data: dataDoctorById, refresh: refreshDataDoctorById } =
    useGetDoctorByIdQuery(selectedOption?.value, {
      skip: !selectedOption?.value,
      refetchOnMountOrArgChange: true,
    });

  // Effects for fetching options
  useEffect(() => {
    if (dataAllDoctors?.data?.length) {
      setOptions((prev) => ({
        ...prev,
        doctors: dataAllDoctors.data.map((user, index) => ({
          value: user.id,
          label: `${index + 1} - ${user.positionData.valueVi}, ${
            user.firstName
          } ${user.lastName}`,
        })),
      }));
    }
    if (dataPriceAllCode?.data?.length) {
      setOptions((prev) => ({
        ...prev,
        prices: dataPriceAllCode.data.map((item) => ({
          value: item.key,
          label: `${item.valueVi}đ`,
        })),
      }));
    }
    if (dataPaymentAllCode?.data?.length) {
      setOptions((prev) => ({
        ...prev,
        payments: dataPaymentAllCode.data.map((item) => ({
          value: item.key,
          label: item.valueVi,
        })),
      }));
    }
    if (dataProvinceAllCode?.data?.length) {
      setOptions((prev) => ({
        ...prev,
        provinces: dataProvinceAllCode.data.map((item) => ({
          value: item.key,
          label: item.valueVi,
        })),
      }));
    }
    if (dataAllSpecialist?.data?.length) {
      setOptions((prev) => ({
        ...prev,
        specialists: dataAllSpecialist.data.map((item) => ({
          value: item.id,
          label: item.name,
        })),
      }));
    }
  }, [
    dataAllDoctors,
    dataPriceAllCode,
    dataPaymentAllCode,
    dataProvinceAllCode,
    dataAllSpecialist,
  ]);

  // Populate getDataInput and Select values when API data is loaded
  useEffect(() => {
    if (tableDoctorInforById && dataDoctorById) {
      const doctorData = dataDoctorById?.data;
      const tableData = tableDoctorInforById?.data;

      setGetDataInput((prevState) => ({
        ...prevState,
        doctorId: doctorData?.id || "",
        contentHTML: doctorData?.MarkdownData?.contentHTML || "",
        contentMarkdown: doctorData?.MarkdownData?.contentMarkdown || "",
        description: doctorData?.MarkdownData?.description || "",
        priceId: tableData?.priceId || "",
        provinceId: tableData?.provinceId || "",
        specialistId: tableData?.specialistId || "",
        paymentId: tableData?.paymentId || "",
        addressClinic: tableData?.addressClinic || "",
        nameClinic: tableData?.nameClinic || "",
        note: tableData?.note || "",
      }));

      // Set selected values when render component
      setSelectedOption(
        options.doctors.find((doc) => doc.value === doctorData?.id) || null
      );
      setSelectedOptionPrice(
        options.prices.find((price) => price.value === tableData?.priceId) ||
          null
      );
      setSelectedOptionPayment(
        options.payments.find(
          (payment) => payment.value === tableData?.paymentId
        ) || null
      );
      setSelectedOptionProvince(
        options.provinces.find(
          (province) => province.value === tableData?.provinceId
        ) || null
      );
      setSelectedAllSpecialist(
        options.specialists.find(
          (specialists) => specialists.value === tableData?.specialistId
        ) || null
      );
    }
  }, [tableDoctorInforById, dataDoctorById, options]);

  // get data select when change option select
  useEffect(() => {
    setGetDataInput((prev) => ({
      ...prev,
      doctorId: selectedOption?.value || prev.doctorId,
      priceId: selectedOptionPrice?.value || prev.priceId,
      paymentId: selectedOptionPayment?.value || prev.paymentId,
      provinceId: selectedOptionProvince?.value || prev.provinceId,
      specialistId: selectedAllSpecialist?.value || prev.specialistId,
    }));
  }, [
    selectedOption,
    selectedOptionPrice,
    selectedOptionPayment,
    selectedOptionProvince,
    selectedAllSpecialist,
  ]);

  // Handlers
  const handleEditorChange = ({ html, text }) => {
    setGetDataInput((prev) => ({
      ...prev,
      contentHTML: html,
      contentMarkdown: text,
    }));
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setGetDataInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSummit = async () => {
    try {
      const input = {
        ...getDataInput,
        doctorId: isDoctor ? isDoctorIdRedux : getDataInput.doctorId,
      };
      const [res, resTableInfor] = await Promise.all([
        createDoctor(input).unwrap(),
        createTableDoctorInfo(input).unwrap(),
      ]);
      if (res.errCode === 0 && resTableInfor.errCode === 0) {
        toast.success(res.message);
        // refresh api
        refreshTableDoctorInforById();
        refreshDataDoctorById();
      } else {
        toast.error(resTableInfor.message || res.message);
      }
    } catch (error) {
      console.error("Error creating doctor: ", error);
    }
  };

  // Render
  return (
    <div className="ManagerDocTor-container">
      <h1 className="title">Tạo thêm thông tin Bác sĩ</h1>
      <div className="content-top">
        {!isDoctor && (
          <div className="selector-doctor">
            <label>Chọn bác sĩ</label>
            <Select
              placeholder="Chọn bác sĩ..."
              value={selectedOption}
              onChange={setSelectedOption}
              options={options.doctors}
            />
          </div>
        )}
        <div className="introduce-doctor">
          <label>Thông tin giới thiệu</label>
          <textarea
            rows="4"
            name="description"
            onChange={handleInputChange}
            value={getDataInput.description}
          />
        </div>
      </div>
      <div className="selector-groupInput">
        <div className="input-price">
          <label>Chọn giá</label>
          <Select
            value={selectedOptionPrice}
            onChange={setSelectedOptionPrice}
            options={options.prices}
          />
        </div>
        <div className="input-Payment">
          <label>Chọn phương thức thanh toán</label>
          <Select
            value={selectedOptionPayment}
            onChange={setSelectedOptionPayment}
            options={options.payments}
          />
        </div>
        <div className="input-Province">
          <label>Chọn tỉnh thành</label>
          <Select
            value={selectedOptionProvince}
            onChange={setSelectedOptionProvince}
            options={options.provinces}
          />
        </div>
        <div className="typeText input-nameClinic">
          <label>Tên phòng khám</label>
          <input
            type="text"
            name="nameClinic"
            value={getDataInput.nameClinic}
            onChange={handleInputChange}
          />
        </div>
        <div className="typeText input-address">
          <label>Địa chỉ phòng khám</label>
          <input
            type="text"
            name="addressClinic"
            value={getDataInput.addressClinic}
            onChange={handleInputChange}
          />
        </div>
        <div className="typeText input-note">
          <label>Note</label>
          <input
            type="text"
            name="note"
            value={getDataInput.note}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-Specialist">
          <label>Chọn chuyên khoa</label>
          <Select
            value={selectedAllSpecialist}
            onChange={setSelectedAllSpecialist}
            options={options.specialists}
          />
        </div>
      </div>
      <div className="content-bottom">
        <MdEditor
          style={{ height: "314px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
          value={getDataInput.contentMarkdown}
        />
        <button className="btn btn-warning mt-3" onClick={handleSummit}>
          Lưu thông tin
        </button>
      </div>
    </div>
  );
};

export default AddInfoDoctor;

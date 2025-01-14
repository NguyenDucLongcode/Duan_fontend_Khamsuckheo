import axios from "../utilities/axios";

const getAllCodeByStyle = (style) => {
  return axios.get(`api/v1/get-allCode?type=${style}`);
};

export { getAllCodeByStyle };

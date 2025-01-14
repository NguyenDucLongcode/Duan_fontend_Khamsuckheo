import axios from "../utilities/axios";

const handleLoginUser = async (data) => {
  return await axios.post("api/v1/login", data);
};

export { handleLoginUser };

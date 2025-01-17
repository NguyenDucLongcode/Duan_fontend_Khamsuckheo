import "./Login.scss";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { handleLoginUser } from "../services/userServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/Slice/userSlice";

const Login = () => {
  // states
  const [dataInputLogin, setDataInputLogin] = useState({
    email: "",
    password: "",
  });

  const [isShowPassword, setIsShowPassword] = useState(true);
  // hooks
  let navigate = useNavigate();
  const dispatch = useDispatch();

  //  functions
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setDataInputLogin({
      ...dataInputLogin,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let res = await handleLoginUser(dataInputLogin);
    if (res && res.errCode === 0) {
      toast.success(res.message);
      dispatch(userLogin(res.user));
      navigate("/system");
    } else {
      toast.error(res.message);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleShowHidePass = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your Username"
            required
            value={dataInputLogin.email}
            name="email"
            onChange={(event) => {
              handleOnChange(event);
            }}
          />
          <input
            type={isShowPassword ? "password" : "text"}
            placeholder="Enter your password"
            required
            name="password"
            value={dataInputLogin.password}
            onChange={(event) => {
              handleOnChange(event);
            }}
          />
          <span className="icon-pass" onClick={handleShowHidePass}>
            {isShowPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          <button type="submit" onKeyDown={handleKeyDown}>
            Login
          </button>
        </form>
        <a href="#">Forgot your password?</a>
        <div className="social-login">
          <p>Or Login with:</p>
          <button className="login-gg">G+</button>
          <button className="login-f">F</button>
        </div>
      </div>
    </div>
  );
};
export default Login;

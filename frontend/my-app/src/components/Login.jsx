import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkrole } from "../slice/staffcustomerSlice";
import { loginSuccess ,login , usertoken} from "../slice/authSlice";
import toast from "react-hot-toast";
const LoginForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        formData
      );
        //  console.log(response.data.token);
      const userId = response?.data;
      dispatch(loginSuccess(userId));
      dispatch(usertoken(response?.data?.token))

      let type = response.data.user.role;
      dispatch(loginSuccess(userId));
      if (type === "staff") {
        dispatch(checkrole(false));
      } else {
        dispatch(checkrole(true));
      }
      dispatch(login(true));
      toast.success("Login Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      if(error.response.status ===401){
        toast.error("Incorrect Password");
      }
      else{
        toast.error("User Does Not exist ");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen mt-[-100px]">
      <div className="bg-orange-100 p-8 rounded-lg shadow-lg w-11/12 md:w-1/3 lg:w-1/4">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email ID"
              className="border-2 border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="border-2 border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

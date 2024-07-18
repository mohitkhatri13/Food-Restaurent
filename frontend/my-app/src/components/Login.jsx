import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkrole } from "../slice/staffcustomerSlice";
import { loginSuccess, login, usertoken } from "../slice/authSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { IoMailOutline } from "react-icons/io5";
import { BiLockAlt } from "react-icons/bi";
import loginpageimage from "../assets/loginimage2.jpg";
import Input from "./common/Input";

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
        "https://food-restaurent-plum.vercel.app/api/v1/auth/login",
        formData
      );
      //  console.log(response.data.token);
      const userId = response?.data;
      dispatch(loginSuccess(userId));
      dispatch(usertoken(response?.data?.token));

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
      if (error.response.status === 401) {
        toast.error("Incorrect Password");
      } else {
        toast.error("User Does Not exist");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-full">
      <div className=" flex flex-col items-center justify-center w-1/2  p-8 h-full">
        <div className="mt-12 mb-6 flex flex-col gap-3">
          <h2 className="text-center md:text-left font-bold text-3xl">
            Welcome back
          </h2>
          <p className="text-center md:text-left text-sm">
            New to Greedy-Guts?{" "}
            <Link to={"/signup"} className="text-orange-400 font-semibold">
              Create an account
            </Link>
          </p>
        </div>
        <div className="p-8 rounded-lg shadow-lg scale-75 md:scale-100 lg:w-9/12 lg:h-[50vh]">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <Input
            type={"email"}
            id={"email"}
            icon={<IoMailOutline />}
            handleChange={handleChange}
            value={formData.email}
            label={"Email"}
            placeholder={" Enter Your Email Id"}
          />
           <Input
            type={"password"}
            id={"password"}
            icon={<BiLockAlt />}
            handleChange={handleChange}
            value={formData.password}
            label={"Password"}
            placeholder={"Enter your Password"}

          />

             
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded w-full"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="  hidden lg:block w-1/2  h-[100vh] bg-no-repeat bg-cover bg-center mt-[75px]"
        style={{ backgroundImage: `url(${loginpageimage})` }}
      ></div>
    </div>
  );
};

export default LoginForm;

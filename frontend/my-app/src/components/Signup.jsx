import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {login} from "../slice/authSlice"
import { useDispatch } from 'react-redux';
import { checkrole } from '../slice/staffcustomerSlice';
const SignupForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: '',
    role: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit =async (e) => {

    e.preventDefault();
    try{
       const response=  await axios.post("http://localhost:3000/api/v1/auth/signup" , formData)
         dispatch(login(true));
         let type = response.data.user.role;
         if(type==="staff"){
          console.log("hello");
          dispatch(checkrole(true));
         }
         else{
          dispatch(checkrole(false));
         }
         navigate("/")
    }
    catch(error){
        console.log(error);
    }
   
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-orange-100 p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 ">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="border-2 border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="border-2 border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border-2 border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
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
            <input
              type="password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="border-2 border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border-2 border-gray-300 p-2 w-full rounded"
              required
            >
              <option value="">Select Role</option>
              <option value="staff">Staff</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

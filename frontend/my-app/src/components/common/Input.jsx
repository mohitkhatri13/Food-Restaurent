import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Input = ({
  icon,
  handleChange,
  label,
  id,
  type,
  value,
  placeholder,
  pattern,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false); // track first blur

  const handleBlur = () => {
    setTouched(true);
  };

  const isValid = pattern ? new RegExp(pattern).test(value) : true;


  return (
    <div className="flex flex-col relative mb-3">
      <label htmlFor={id} className="text-sm font-semibold mb-3">
        {label}
      </label>
      <span className="absolute top-[39px] left-3 bg-light p-1 rounded text-orange-400">
        {icon}
      </span>

      <input
        type={type === "password" && showPassword ? "text" : type}
        onChange={handleChange}
        value={value}
        id={id}
        name={id}
        placeholder={placeholder}
        onBlur={handleBlur} // set touched after leaving field
        pattern={pattern}
        className={`py-1.5 px-11 border bg-gray-100 rounded-lg focus:outline outline-orange-400 ${
          touched && !isValid ? "border-red-500" : ""
        }`}
      />

      {type === "password" &&
        (showPassword ? (
          <AiOutlineEyeInvisible
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[42px] right-3 cursor-pointer text-gray-700 text-lg"
          />
        ) : (
          <AiOutlineEye
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[42px] right-3 cursor-pointer text-gray-700 text-lg"
          />
        ))}

      {/* show error only after first blur and if invalid */}
      {touched && !isValid && (
        <span className="pl-2 text-[12px] mt-1 text-orange-400">{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;

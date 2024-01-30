import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import loginsignupImage from "../assest/login-animation.gif";
import { Link } from "react-router-dom";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-md bg-white m-auto flex items-center flex-col p-4">
        <h1 className="text-center text-2xl font-bold ">Sign Up</h1>
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md">
          <img className="w-full" src={loginsignupImage} alt="" />
        </div>
        <form className="w-full py-3 flex flex-col">
          <label htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="my-2 w-full bg-slate-200 rounded-lg px-2 py-1"
            value={data.firstName}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="my-2 w-full bg-slate-200 rounded-lg px-2 py-1"
          />
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="my-2 w-full bg-slate-200 rounded-lg px-2 py-1"
          />
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="my-2 w-full px-2 py-1 bg-slate-200 rounded-lg "
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer text-xl "
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmpassword"
              className="my-2 w-full px-2 py-1 bg-slate-200 rounded-lg "
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer text-xl "
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full my-3">
            Sign Up
          </button>
        </form>
        <p className="text-left text-xs">
          Already have account ?{" "}
          <Link to={"login"} className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import loginsignupImage from "../assest/login-animation.gif";
import { Link } from "react-router-dom";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // console.log(data);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault(); //page will not refresh
    const {email, password} = data;
    if (email && password) {
      alert("Successfull");
    } else {
      alert("Please enter required fields");
    }
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-md bg-white m-auto flex items-center flex-col p-4">

        <h1 className="text-center text-2xl font-bold ">Login</h1>
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md">
          <img className="w-full" src={loginsignupImage} alt="" />
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>

          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="my-2 w-full bg-slate-200 rounded-lg px-2 py-1"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="my-2 w-full px-2 py-1 bg-slate-200 rounded-lg "
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer text-xl "
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full my-3">
            Login
          </button>

        </form>

        <p className="text-left text-xs">
          Don't have account ?{" "}
          <Link to={"/signup"} className="text-red-500 underline">
            Sign up
          </Link>
        </p>
        
      </div>
    </div>
  );
}

export default Signup;

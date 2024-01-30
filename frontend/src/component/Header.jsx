import React, { useState } from "react";
import logo from "../assest/logo.png";
import { Link } from "react-router-dom";
import { FaRegUserCircle, FaShoppingCart, FaUserAlt } from "react-icons/fa";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu=()=>{
    setShowMenu(prev=>!prev);
  }
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* desktop */}
      <div className="flex items-center justify-between h-full">
        <Link to={"/"}>
          <div className="h-10">
            <img className="h-full" src={logo} alt="logo" />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className="flex gap-4 md:gap-6 text-base md:text-lg">
            <Link to={""}>Home</Link>
            <Link to={"menu"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <FaShoppingCart />
            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 flex items-center justify-center rounded-full">
              <span class="text-xs font-semibold">99</span>
            </div>
          </div>
          <div className=" text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer" >
              <FaRegUserCircle />
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 px-2 shodow drop-shadow-md flex flex-col">
                <Link to={"newproduct"} className="whitespace-nowrap cursor-pointer">New Product</Link>
                <Link to={"login"} className="whitespace-nowrap cursor-pointer">Login</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

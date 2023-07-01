import React from "react";
import { Link } from "react-router-dom"
import LoginIcon from "../assets/icons/LoginIcon";
import OnlyGuest from "/OnlyGuests.png"

type TNavBar = {
  children?: JSX.Element | JSX.Element[]
}

const NavBar: React.FC<TNavBar> = ({ children }) => {
  return (
    <nav className="
      fixed 
      top-0 
      left-0 
      h-[90px] 
      bg-[#242424]/30 
      w-screen
      flex
      items-center
      px-7
      justify-between
      z-50
      backdrop-blur-md
    ">
      <div className="flex">
        <img src={OnlyGuest} className="h-[80px]" />
        {children}
      </div>

      <Link to={"/auth"}
        className="flex gap-2 px-4 py-1 border rounded-full border-slate-300"
      >
        <LoginIcon />
        <h3>Log In</h3>
      </Link>
    </nav>
  )
}

export default NavBar

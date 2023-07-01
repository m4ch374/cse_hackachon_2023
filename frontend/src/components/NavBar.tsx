import React from "react";
import OnlyGuest from "/OnlyGuests.png"

type TNavBar = {
  children?: JSX.Element
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
      </div>

      {children}
    </nav>
  )
}

export default NavBar

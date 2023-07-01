import React, { MouseEventHandler } from "react";

type TPopupBackground = {
  children?: JSX.Element | JSX.Element[],
  togglePop?: Function
}

const PopupBackground: React.FC<TPopupBackground> = ({ children, togglePop }) => {
  return (
    <div className="fixed 
      top-0 
      left-0 
      w-screen
      h-screen
      bg-[#d8d5d0]
      bg-opacity-50
      backdrop-blur-[15px]
      dark:bg-[#1C1C1C] 
      dark:bg-opacity-30 
      dark:backdrop-blur-[20px] 
      z-[1000]
      flex
      items-center
      justify-center"
      onClick={togglePop as MouseEventHandler}>
        <div onClick={e => e.stopPropagation()}>
          {children}
        </div>
    </div>
  )
}

export default PopupBackground
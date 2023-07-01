import React from "react";
import PopupBackground from "./PopupBackground";
import { motion } from 'framer-motion'

type TProjectDetails = {
  setPopped: Function,
  children: JSX.Element
}

const Popup: React.FC<TProjectDetails> = ({setPopped, children}) => {
  const popIn = {
    hidden: {
      transform: 'scale(0.3)',
      opacity: 0
    },
    visible: {
      transform: 'scale(1)',
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
      }
    },
    exit: {
      transform: 'scale(0.2)',
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.2
      }
    }
  }
  return (
    <PopupBackground togglePop={() => setPopped(false)}>
      <motion.div 
        variants={popIn} 
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex 
          w-[400px] 
          aspect-[3/4] 
          flex-col 
          lg:flex-row 
          lg:w-[680px] 
          lg:aspect-[10/8] 
          bg-[#2d2d38] 
          rounded-xl 
          place-items-start 
          overflow-show 
          border-2 
          border-[#70478b] 
          custom-popup-drop-shadow
        "
      >

        {children}
        
      </motion.div>
    </PopupBackground>
  )
}

export default Popup
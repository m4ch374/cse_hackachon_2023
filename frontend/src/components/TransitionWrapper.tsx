import React from "react";
import { motion } from 'framer-motion'

const TransitionWrapper: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const pageTransition = {
    out: {
      opacity: 0,
      transition: {
        duration: 0.25,
        delay: 0.2
      }
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2
      }
    }
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="out"
      animate="in"
      exit="out"
    >
      { children }
    </motion.div>
  )
}

export default TransitionWrapper

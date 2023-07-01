import React from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion"
import Landing from "../pages/Landing";
import Auth from "../pages/Auth";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "../pages/Dashboard";

const MyRoutes: React.FC = () => {
  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => scrollTo({top: 0})}>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/auth' element={<Auth />} />

          <Route path='/' element={<ProtectedRoutes />}>
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
    </AnimatePresence>
  )
}

export default MyRoutes

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const ProtectedRoutes: React.FC = () => {
  if (!localStorage.getItem("token")) {
    return <Navigate to={"/"} />
  }

  return (
    <>
      <NavBar />
      <div className="mt-[100px]">
        <Outlet />
      </div>
    </>
  )
}

export default ProtectedRoutes

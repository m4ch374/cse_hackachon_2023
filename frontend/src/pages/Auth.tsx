import React from "react";
import AuthCard from "../components/AuthCard";
import TransitionWrapper from "../components/TransitionWrapper";

const Auth: React.FC = () => {
  return (
    <TransitionWrapper>
      <div className="flex justify-center items-center h-screen">
        <AuthCard />
      </div>
    </TransitionWrapper>
  )
}

export default Auth

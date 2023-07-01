import React from "react";
import NavBar from "../components/NavBar";
import BannerImage from "/anime_travel.jpg";

const Landing: React.FC = () => {
  return (
    <>
      <NavBar />

      <div className="w-full mt-[100px] flex flex-col items-center">
        <div className="flex flex-col items-center text-xl font-thin">
          <h1>You want to travel? You want Friends?</h1>
          <h1 className="text-2xl font-semibold">We got you buddy!</h1>

          <img src={BannerImage} className="w-[80%] max-w-[1000px] custom-drop-shadow rounded-xl mt-4" />
        </div>
      </div>
    </>
  )
}

export default Landing

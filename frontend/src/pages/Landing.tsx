import React from "react";
import NavBar from "../components/NavBar";
import BannerImage from "/anime_travel.jpg";
import LandingBannerDivider from "../assets/divider/LandingBanerDivider";
import { Link } from 'react-router-dom'
import LoginIcon from "../assets/icons/LoginIcon";

const Landing: React.FC = () => {
  return (
    <div className="">
      <NavBar>
        <Link to={"/auth"}
          className="flex gap-2 px-4 py-1 border rounded-full border-slate-300"
        >
          <LoginIcon />
          <h3>Log In</h3>
        </Link>
      </NavBar>
      
      <div className="w-full mt-[100px] flex flex-col items-center">
        <div className="flex flex-col items-center text-xl font-thin">
          <h1 className="relative top-0 left-0 z-10">Want to travel? Want Friends?</h1>
          <h1 className="relative top-0 left-0 z-10 text-2xl font-semibold">We got you buddy!</h1>

          <img src={BannerImage} className="w-[80%] max-w-[1000px] custom-drop-shadow rounded-xl mt-4" />
        </div>

        <div className="-mt-[100px]">
          <LandingBannerDivider />

          <div className="w-full bg-[#552B5C] pb-[80px] relative top-0 left-0 z-20 flex flex-col items-center">
            <h1 className="font-thin text-3xl">Wanna hear our customer testimonials?</h1>
            
            <div className="grid grid-cols-3 w-[80%] mt-[50px] gap-8">
              <div className="col-span-2 testimonial testimonial-1">
                "Idk bro the website is kinda sketchy and whatnot"
              </div>

              <div className="col-span-1 testimonial testimonial-2">
                "Lol"
              </div>

              <div className="col-span-1 testimonial testimonial-3">
                "huh?"
              </div>

              <div className="col-span-2 testimonial testimonial-4">
                "I've sold my soul to the demon and now I have no friends, with this website, I could finally have friends!"
              </div>
            </div>

            <div className="w-full flex flex-col items-center mt-[80px] gap-8">
                <h1 className="text-4xl">Excited? Get started now!</h1>
                <Link to={"/auth"}
                  className="
                    px-4
                    py-2
                    bg-blue-500
                    text-2xl
                    rounded-full
                  "
                >
                  Get Started
                </Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing

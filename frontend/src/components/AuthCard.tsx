import React, { useState } from "react";
import Lock from "../assets/icons/Lock";

const AuthCard: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)

  const formSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const userName = e.currentTarget.username
    const email = e.currentTarget.email
    const password = e.currentTarget.password 
    console.log(email.value)
    console.log(password.value)

    if (!isLogin) {
      console.log(userName.value)
    }
  }

  return (
    <form onSubmit={formSubmit} className="
      w-[350px] 
      bg-white
      rounded-md 
      text-black/90
      flex
      flex-col
      items-center
      p-8"
    >
      <Lock />  
      <h1 className="m-2 text-3xl font-medium">{isLogin ? "Login" : "Register"}</h1>

      <div className="grid gap-4 w-full text-md">
        {!isLogin &&
          <div>
            <label className="font-bold">Username:</label>
            <input 
              name="username"
              type="text"
              className="shadow 
                appearance-none 
                border 
                rounded 
                w-full 
                py-2 
                px-3 
                text-gray-700 
                leading-tight 
                focus:outline-none 
                focus:shadow-outline" 
            />
          </div>
        }

        <div>
          <label className="font-bold">Email:</label>
          <input 
            name="email"
            type="email"
            className="shadow 
              appearance-none 
              border 
              rounded 
              w-full 
              py-2 
              px-3 
              text-gray-700 
              leading-tight 
              focus:outline-none 
              focus:shadow-outline" 
          />
        </div>
        <div>
          <label className="font-bold">Passowrd:</label>
          <input 
            name="password"
            type="password"
            className="shadow 
              appearance-none 
              border 
              rounded 
              w-full 
              py-2 
              px-3 
              text-gray-700 
              leading-tight 
              focus:outline-none 
              focus:shadow-outline" 
          />
        </div>

        <button type="button" 
          className="underline text-blue-700 justify-self-start"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ?
            "No account? Register!":
            "Have an account? Login!"
          }
        </button>

        <button className="
          px-4 
          py-2 
          bg-blue-500 
          text-white/80 
          mt-5
          rounded-md
          justify-self-end"
        >
          Go
        </button>
      </div>
    </form>
  )
}

export default AuthCard

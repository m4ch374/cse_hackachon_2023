import React, { createContext, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Popup from "./Popup/Popup";
import { AnimatePresence } from 'framer-motion'
import CreateSessionForm from "./CreateSessionForm";

const useTravelSession = () => {
	const [session, setSessions]: any = useState([])

	const addSession = (session_meta: any) => {
		setSessions([session_meta, ...session])
	}

	const loadSession = (all: any) => {
		setSessions(all)
	}

	return [session, addSession, loadSession]
}

const TravelSessionContext = createContext(null)

const ProtectedRoutes: React.FC = () => {
  if (!localStorage.getItem("token")) {
    return <Navigate to={"/"} />
  }

  const travelSession: any = useTravelSession()

  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  const [popClicked, setPopClicked] = useState(false)

  return (
    <TravelSessionContext.Provider value={travelSession}>
      <AnimatePresence initial={false}>
        {popClicked &&
          <Popup setPopped={setPopClicked}>
            <CreateSessionForm setPopup={setPopClicked} />
          </Popup> 
        }
      </AnimatePresence>

      <NavBar>
        <div className="flex gap-4">
          <button onClick={() => setPopClicked(true)} className="px-2 py-1 border rounded-md">
            Create session
          </button>
          <button onClick={logout} className="py-1 px-4 border border-red-600 rounded-full text-red-500">
            Logout
          </button>
        </div>
      </NavBar>
      <div className="mt-[100px]">
        <Outlet />
      </div>
    </TravelSessionContext.Provider>
  )
}

export default ProtectedRoutes
export { TravelSessionContext }

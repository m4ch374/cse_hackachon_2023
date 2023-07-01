import React, { useState } from "react";
import { AnimatePresence } from 'framer-motion'
import Popup from "./Popup/Popup";
import Person from "../assets/icons/Person";
import MapPin from "../assets/icons/MapPin";
import Rocket from "../assets/icons/Rocket";
import CheckMark from "../assets/icons/CheckMark";
import Fetcher from "../utils/fetcher";
import { ADD_ROUTE, REMOVE_ROUTE } from "../utils/endpoint";

type TTravelSessionCard = {
  session_meta: {
    title: string,
    city: string,
    country: string,
    start: string,
    end: string,
    id: number,
    max_guests: number,
    curr_guests: number,
    is_host: boolean,
    joined: boolean
  }
}

const TravelSessionCard: React.FC<TTravelSessionCard> = ({ session_meta }) => {
  const [popClicked, setPopClicked] = useState(false)

  const [join, setJoin] = useState(session_meta.joined)
  const [currPpl, setCurrPpl] = useState(session_meta.curr_guests)

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    setJoin(!join)

    if (join) {
      setCurrPpl(currPpl - 1)
    } else {
      setCurrPpl(currPpl + 1)
    }
    
    Fetcher.put(join ? REMOVE_ROUTE : ADD_ROUTE).withLocalStorageToken()
      .withJsonPayload({
        "session_id": session_meta.id
      })
      .fetchResult()
  }

  return (
    <>
      <AnimatePresence initial={false}>
        {popClicked &&
          <Popup setPopped={setPopClicked}>
            <div className="p-8 h-full w-full">
              <div className="flex flex-col gap-2 h-full">
                <h1 className="text-3xl">{session_meta.title}</h1>
                <div className="flex gap-2 items-center">
                  <MapPin />
                  <h3>{session_meta.city}, {session_meta.country}</h3>
                </div>

                <div className="text-xl mt-4">
                  <h2>Starting Date: {session_meta.start}</h2>
                  <h2>Ending Date: {session_meta.end}</h2>
                </div>
                
                <div className="flex relative h-full items-end">
                  <div className="flex justify-between w-full">
                    <h1 className="text-2xl">Participants: {currPpl}/{session_meta.max_guests}</h1>
                    {session_meta.is_host ? 
                      <button className="px-2 py-1 cursor-not-allowed border border-slate-400 rounded-md">You are host</button>:
                      session_meta.curr_guests < session_meta.max_guests ? 
                        join ? 
                          <button onClick={handleClick} className="px-4 py-1 border border-red-500 text-red-500 rounded-md">Cancel</button> : 
                          <button onClick={handleClick} className="px-4 py-1 rounded-md bg-green-500">Join</button>:
                        <button className="px-2 py-1 cursor-not-allowed border border-slate-400 rounded-md">Full</button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </Popup> 
        }
      </AnimatePresence>

      <div onClick={() => setPopClicked(true)} className="bg-[#3c3c3c] h-[80px] p-4 rounded-md flex items-center justify-between text-2xl">
        <div>
          <div className="flex gap-4 items-center">
            <Person />
            <h1>{session_meta.title}</h1>
          </div>
          <div className="flex gap-2 text-sm items-center">
            <MapPin />
            <h3>{session_meta.city}, {session_meta.country}</h3>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <h1>{currPpl}/{session_meta.max_guests}</h1>
          {(!session_meta.is_host && session_meta.curr_guests < session_meta.max_guests) && 
            <button onClick={handleClick} className={`border ${join ? "border-green-500 text-green-500" : "border-purple-500 text-purple-500"} p-2 rounded-md`}>
              {join ? <CheckMark /> : <Rocket />}
            </button>
          }
        </div>
      </div>
    </>
  )
}

export default TravelSessionCard

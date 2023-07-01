import React, { useContext, useState } from "react";
import CheckMark from "../assets/icons/CheckMark";
import Edit from "../assets/icons/Edit";
import Datepicker from "react-tailwindcss-datepicker"; 
import Fetcher from "../utils/fetcher";
import { SESSION_ROUTE } from "../utils/endpoint";
import { TravelSessionContext } from "./ProtectedRoutes";

type TCreateSessionForm = {
  setPopup: Function
}

const CreateSessionForm: React.FC<TCreateSessionForm> = ({ setPopup }) => {
  const addSession = (useContext(TravelSessionContext) as any)[1] // Epic code

  const [titleEdit, setTitleEdit] = useState(false)
  const [title, setTitle] = useState("New session")

  const [value, setValue]:any = useState({ 
    startDate: new Date(), 
    endDate: new Date().setMonth(11) 
  }); 

  const handleValueChange = (newValue: any) => {
    setValue(newValue); 
  } 

  const submitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    
    const maxGuest = parseInt(e.currentTarget.maxGuests.value)
    const country = e.currentTarget.country.value
    const city = e.currentTarget.city.value
    const start = new Date(value.startDate).toISOString().substring(0, 10)
    const end = new Date(value.endDate).toISOString().substring(0, 10)

    const payload = {
      title: title,
      max_guests: maxGuest,
      start: start,
      end: end,
      country: country,
      city: city,
      tags: [],
    }

    Fetcher.post(SESSION_ROUTE).withLocalStorageToken()
      .withJsonPayload(payload)
      .fetchResult()
      .then((data: any) => {
        // Artificially add a session
        addSession({
          title: title,
          city: city,
          country: country,
          start: start,
          end: end,
          id: data.res,
          max_guests: maxGuest,
          curr_guests: 0,
          is_host: true,
          joined: false
        })
      })

    setPopup(false)
  }

  return (
    <form onSubmit={submitForm} className="p-8 flex flex-col w-full h-full justify-start">
      <div className="flex">
        {
          titleEdit ? 
            <input 
              type="text" 
              value={title} 
              className="text-3xl p-0 m-0 mb-2 bg-transparent w-[80%] border-b-2 border-blue-400 focus:outline-none" 
              onChange={(e) => setTitle(e.target.value)} 
            /> 
          :
            <div className="text-3xl p-0 m-0 mr-4 mb-2 bg-transparent">{title}</div>
        }

        <button type="button" onClick={() => setTitleEdit(!titleEdit)}>
          {titleEdit ? <CheckMark /> : <Edit />}
        </button>
      </div>

      <div className="grid gap-4">
        <div className="mt-3">
          <label>Pick date range:</label>
          <Datepicker 
            value={value} 
            onChange={handleValueChange} 
            useRange={false}
            primaryColor="amber"
          /> 
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Max Guests</label>
          <input type="text" name="maxGuests" 
            className="
              text-sm 
              rounded-lg 
              block 
              w-full 
              p-2.5 
              bg-[#1e293b] 
              focus:ring-blue-500 
              focus:border-blue-500
            " 
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Country</label>
          <input type="text" name="country" 
            className="
              text-sm 
              rounded-lg 
              block 
              w-full 
              p-2.5 
              bg-[#1e293b] 
              focus:ring-blue-500 
              focus:border-blue-500
            " 
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">City</label>
          <input type="text" name="city" 
            className="
              text-sm 
              rounded-lg 
              block 
              w-full 
              p-2.5 
              bg-[#1e293b] 
              focus:ring-blue-500 
              focus:border-blue-500
            " 
          />
        </div>
      </div>

      <button className="mt-[30px] bg-purple-700 py-2 rounded-md">
        Go
      </button>
    </form>
  )
}

export default CreateSessionForm

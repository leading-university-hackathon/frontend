"use client"
import LoaderEffect from "@/components/LoaderEffect"
import UserEventCard from "@/components/UserEventCard"
import { useEffect, useState } from "react"

export default function page({ params }) {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    fetch(`${endpoint}/doctor_serial/upcoming`, {
      method: 'GET',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken }
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        console.log(data)
      })
  }, [])

  return (
    <>
        {data && data?.detail != 'empty' && <h1 className="text-center w-full text-xl tracking-wider">Your Upcoming Doctor Appointments :</h1>}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 my-10">
         {data && data?.detail != 'empty' && data?.map(userEvent => <UserEventCard key={userEvent.id} userEvent={userEvent} id={params.id} />) }
        </div>
      
      {
        data && data?.detail == 'empty' && 
        <div className="flex mt-32 justify-center h-screen w-full">
          <h1 className="text-xl text-center mx-auto">No Upcoming Appointments Found</h1>
        </div>
      }
      {
        !data && <div className="flex items-center justify-center">
          <LoaderEffect />
        </div>
      }
    </>
  )
}

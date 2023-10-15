"use client"
import React, { useEffect, useState } from 'react'
import DoctorCard from './DoctorCard'
import LoaderEffect from './LoaderEffect'

export default function DoctorsList({ doctorName }) {
  const [data, setData] = useState(null)
  const [allData, setAllData] = useState(null)
 
  useEffect(() => {
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    fetch(`${endpoint}/doctor/all`, {
      method: 'GET',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken }
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setAllData(data)
        console.log(data)
      })
  }, [])

  useEffect(() => {
    setData(allData)
    if(doctorName != "") {
        setData(prevData => prevData.filter(d => (d?.user.name).toLowerCase().includes(doctorName.toLowerCase())))
    }
  }, [doctorName])
  return (
    <>
      {data && data.type != 'empty' &&
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-16 my-10'>
          {data?.map(doctor => <DoctorCard id={doctor.user.id} rating={doctor.rating} hospital={doctor.current_hospital} fee={doctor.offline_fee} onlineFee={doctor.online_fee} name={doctor.user.name} />)}
        </div>
      }
      {data && data.detail == 'empty' &&
        <div className='flex items-center justify-center'>
          <h1>No Doctor Found</h1>
        </div>
      }
      {
        !data &&
        <div className="mt-32 flex justify-center items-center">
          <LoaderEffect />
        </div>
      }
    </>
  )
}

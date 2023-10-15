"use client"
import Prescription from '@/components/Prescription'
import VideoCall from '@/components/VideoCall'
import React, { useEffect, useState } from 'react'

export default function page({ params, searchParams }) {
  const [prescription, setPrescription] = useState(null)
  const [doctor, setDoctor] = useState(null)
  const serialId = searchParams['serialId']

  useEffect(() => {
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    fetch(`${endpoint}/doctor/${params.id}`, {
      method: 'GET',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken }
    })
      .then((res) => res.json())
      .then((data) => {
        setDoctor(data)
        console.log(doctor)
      })
  }, [])

  return (
    <>
        <div className='flex p-4 w-full justify-center'>
            <div className='w-[50%] h-[70%]'>
                <VideoCall />
            </div>
            <div className='w-[50%]'>
              <Prescription prescription={prescription} serialId={serialId} setPrescription={setPrescription} doctorData={doctor} />
            </div>
        </div>  
    </>
  )
}

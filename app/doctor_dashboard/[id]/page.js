"use client"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { TbCircleLetterH } from 'react-icons/tb'
import { HiOutlineLocationMarker } from 'react-icons/hi' 
import { FaUserGraduate } from 'react-icons/fa' 
import LoaderEffect from "@/components/LoaderEffect"


export default function page({ params }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const random_number = Math.floor(Math.random() * (5)) + 1
  const url = `/doctor${random_number}.jpg`

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
        setData(data)
        console.log(data)
        setLoading(false)
      })
  }, [])

  return (
    <main className="h-screen bg-gradient-to-r from-[#40a1ce] to-[#bfecfa] overflow-auto">
      <div className="flex space-x-12 items-center justify-center mt-[5%]">
          <h1 className="text-2xl px-4 py-2 rounded-full border bg-white border-gray-400">Your Current Rating : {data?.rating} / 5 </h1>  
          <h1 className="text-2xl px-4 py-2 rounded-full border bg-white border-gray-400">Your Total Income : {data?.balance} TK</h1>  

      </div>
      <div className="flex w-4/5 justify-between bg-[#f0f0f0] mt-12 mx-auto">

        {data &&
          <div className="p-8">
          <div className="flex space-x-2 items-center">
            <div className="text-3xl bg-black text-white rounded-full"><TbCircleLetterH/></div>
            <h1>PROFILE</h1>
          </div>
          {data && <div className="flex items-center space-x-6">
                        <h1 className="my-4 text-4xl font-bold">{data?.user?.name}</h1>
                        <h1 className="my-4 text-lg font-semibold px-4 py-2 text-white rounded-full bg-[#3668d3] text-center inline">{data?.expertise?.toUpperCase()}</h1>
                      </div>}
                    <div className="flex items-center space-x-6">
                      <div className="relative w-[1rem] h-[1rem] overflow-hidden">
                        <Image src={"/star_vector.png"} layout="fill" objectFit="cover" alt="Star Image" />
                      </div>
                      <h1 className="my-2"><span className="font-semibold">{data?.rating || 0} / 5</span>{" "}<span className="underline font-semibold text-lg">Rating</span></h1>
                    </div>
                    <div className="flex space-x-12 items-center">
                      <div className="flex space-x-4">
                        <HiOutlineLocationMarker className="text-xl" />
                        <h1 className="font-semibold">{data?.current_hospital?.toUpperCase()}, {data?.place?.toUpperCase()}</h1>
                      </div>
                      <div className="flex space-x-2 items-center">
                        <FaUserGraduate className="text-lg" />
                        <h1 className="my-2 text-lg font-semibold">{data?.degrees}</h1>
                      </div>
                    </div>
                    <h1 className="my-2 text-lg grow">Description : "{data?.bio}" </h1>
                    <div className="space-x-6 mt-4 flex">
                      <h1 className="px-4 py-2 rounded-full bg-[#3668d3] text-white font-semibold">Offline Fee : <span className="font-bold">{data?.offline_fee + 10}</span> Tk</h1>
                      <h1 className="px-4 py-2 rounded-full bg-[#3668d3] text-white font-semibold">Online Fee : <span className="font-bold">{data?.online_fee + 10}</span> Tk</h1>
                    </div>
                  </div>
        }
        {!data && <LoaderEffect />}
        <div className={`relative w-[32rem] h-[24rem] overflow-hidden`}>
          <Image src={url} layout="fill" objectFit="cover" alt="Doctor's Image" />
        </div>
      </div>
      
    </main>
  )
}

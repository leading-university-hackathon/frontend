
"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai"

export default function DoctorCard({ id, name, hospital, fee, rating, onlineFee }) {
  const router = useRouter()

  function handleSelectedDoctor(e) {
    router.push(`/consultation/${id}`)
  }

  const random_number = Math.floor(Math.random() * (5)) + 1
  const url = `/doctor${random_number}.jpg`

  return (
    <div onClick={handleSelectedDoctor} key={id} className="my-4 cursor-pointer">
      <div className="relative w-64 h-64 rounded-md overflow-hidden">
        { <Image src={url} layout="fill" objectFit="cover" alt="Image" />}
      </div>
      <div className="flex justify-between items-center p-2">
        <h3 className="font-bold">{name}</h3>
       <div className="flex space-x-1 items-center">
        <AiFillStar />
        <p>{rating}</p>
       </div>
      </div>
      <p className="px-2 text-sm font-semibold">{hospital}</p>
      <div className="px-2 flex items-center space-x-2">
        <p className="text-sm">Offline : <span className="font-bold">{fee + 10}.00</span> Tk,</p>
        <p className="text-sm">Online : <span className="font-bold">{onlineFee + 10}.00</span> Tk</p>
      </div>
    </div>
  )
}


"use client" 
import Image from 'next/image'
import React, { useRef, useState } from 'react'
export default function Message({ sender, messageContent, chatbot }) {
  const isOwner = sender === 'owner'
  
  return (
    <div className={`flex space-x-4 items-baseline p-4 ${isOwner ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {!chatbot && 
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        <Image src={isOwner ? "/patient_avatar.jpg" : "/doctor_avatar.jpg"} layout="fill" objectFit="cover" alt="Image" />
      </div>
      }
      <div className='max-w-[60%]'>
        <p className={`${isOwner ? 'bg-slate-100' : 'bg-blue-300'} rounded-r-lg rounded-e-lg rounded-b-lg p-1 text-lg`}>{messageContent}</p>
      </div>
    </div>
  )
}

"use client"
import Prescription from '@/components/Prescription';
import VideoCall from '@/components/VideoCall';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'

export default function page() {
  const [inCall, setInCall] = useState(true);
  const [doctor, setDoctor] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    if(token.role == 'DOCTOR') {
      setDoctor(true)
    }
  }, [])

  return (
    <div className="h-screen flex w-screen justify-center">
      {inCall ? (
        <div className='flex items-center justify-center w-full h-screen space-x-4'>
          <VideoCall setInCall={setInCall} />
        </div>
      ) : (
        <div className='w-full h-screen flex items-center justify-center'>
          <h1
          onClick={() => setInCall(true)}
          className='text-3xl text-[#3a82ca] underline underline-offset-1'
        >
          Click This Link To Join The Video Conference
        </h1>
        </div>
      )}
    </div>
  );
}

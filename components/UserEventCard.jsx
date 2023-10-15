"use client"
import React from 'react'
import { FiClock } from 'react-icons/fi'
import { CiLocationOn } from 'react-icons/ci'
import { SlCalender } from 'react-icons/sl'
import { Button } from './ui/button'
import Link from 'next/link'

function formatTime(timeStr) {
  timeStr = parseFloat(timeStr).toFixed(2)
  const [hours, minutes] = timeStr.toString().split('.').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedTime = `${formattedHours}:${String(minutes).padStart(2, '0')} ${period}`;
  return formattedTime;
}

const getTimeDifference = (time, date) => {
    time = time.toString().replace(".", ":")
    const appointmentDateTime = new Date(`${date}T${time}:00`)
    const currentDateTime = new Date();
    console.log(appointmentDateTime - currentDateTime)
    if (currentDateTime > appointmentDateTime) {
      return true
    } 
    else {
      return false
    }
};


export default function UserEventCard({ userEvent, id }) {
  userEvent.type = userEvent.type.toLowerCase()
  
  return (
    <div className='p-3 text-white rounded-md bg-gradient-to-r from-[#103153] to-[#103153] z-0'>
      <div className='flex justify-between items-center'>
      {getTimeDifference(userEvent.time, userEvent.date) == false ?
          <Button disabled ={getTimeDifference(userEvent.time, userEvent.date) == false} className={`${getTimeDifference(userEvent.time) > 0 ? "bg-[#bbbbbb] text-black" : "bg-[#7bff00]"} hover:bg-[#478b08] text-black font-bold `}>{userEvent.type == 'online' ? "Join Meeting" : "Doctor will send you an SMS"}</Button>
        :
        <>
          <Link href={`/video/${id}`}>
            <Button disabled ={getTimeDifference(userEvent.time, userEvent.date) == false} className={`${getTimeDifference(userEvent.time) > 0 ? "bg-[#bbbbbb] text-black" : "bg-[#7bff00]"} hover:bg-[#478b08] text-black font-bold `}>{userEvent.type == 'online' ? "Join Meeting" : "Doctor will send you an SMS"}</Button>
          </Link>
        </>
      }
        <div className='flex space-x-3 items-center'>
            <FiClock />
            <h1 className='font-semibold text-lg'>{formatTime(userEvent.time)}</h1>
        </div>
      </div>
        <h1 className='my-4'>Appointment With <span className='font-semibold text-md'>Dr. {userEvent.doctorName}</span></h1>
        <div className='flex justify-between px-2 py-1'>
            <div className='flex space-x-4 items-center'>
                <CiLocationOn />
                <h1 className='font-semibold text-md' >{userEvent.type.toUpperCase()}</h1>
            </div>
            <div className='flex space-x-4 items-center'>
                <SlCalender />
                <h1 className='font-semibold text-md'>{userEvent?.appointmentDate}</h1>
            </div>
        </div>
    </div>
  )
}

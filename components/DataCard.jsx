"use client"
import React, { useEffect, useState } from 'react'
import { FiClock } from 'react-icons/fi'
import { BsCalendarDate } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { returnTime } from './utils'

export default function DateCard({ date, availableOnlineTimes, setOnlineSelected, onlineSelected }) {
    function returnDate(dateStr) {
        const dateObject = new Date(dateStr);
        const monthNames = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ];
        const monthIndex = dateObject.getMonth();
        const day = dateObject.getDate()
        const monthName = monthNames[monthIndex];
        return `${day} ${monthName}, ${date.day}`
    }

    console.log(availableOnlineTimes)

    function handleCardClick() {
        const some = availableOnlineTimes.filter(time => time.id === date.id)
        setOnlineSelected(prev => some[0])
    }

  return (
    <div onClick={handleCardClick} className={`${onlineSelected.id == date.id ? "bg-[#35800b]" : "bg-[#114a79]"} px-4 py-3 rounded-md text-white cursor:pointer space-x-4`}>
      <div className='flex justify-between px-4 py-2 mb-2'>
        <div className='flex space-x-2 items-center'>
            <BsCalendarDate className='text-md'/> 
            <h1 className='font-semibold text-md'>{returnDate(date.date)}</h1>
        </div>
        <div className='flex space-x-2 items-center'>
            <FiClock className={`text-md ${date.availTime == -1 && "hidden"}`}/> 
            <h1 className={`font-semibold text-md ${date.availTime == -1 && "text-[#ee2c2c] text-sm font-semibold"}`}>{date.available_time != -1 ? returnTime(date.available_time) : "Not Available"}</h1>
        </div>
      </div>
      <div className='flex space-x-2 items-center'>
            <CiLocationOn className='text-md'/> 
            <h1 className='font-semibold text-md'>Online</h1>
        </div>
    </div>
  )
}

"use client"
import React, { useEffect, useState } from 'react'
import { FiClock } from 'react-icons/fi'
import { BsCalendarDate } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'

export default function OfflineDateCard({ date, hospital, availableTimes, setOfflineSelected, offlineSelected }) {
    function returnTime(time) {
        let hour = parseInt(time)
        let minute = Math.ceil((time - hour) * 100)
        console.log(minute)
        if(time > 12) return `${hour - 12} : ${minute == 0 ? "00" : minute} PM`
        return `${hour} : ${minute == 0 ? "00" : minute} AM`
    }
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
    function handleCardClick() {
        const some = availableTimes.filter(time => time.id === date.id)
        setOfflineSelected(prev => some[0])
    }


  return (
    <div onClick={handleCardClick} className={`${offlineSelected.id == date.id ? "bg-[#35800b]" : "bg-[#114a79]"} px-4 py-3 rounded-md text-white cursor:pointer space-x-4`}>
      <div className='flex justify-between px-4 py-2 mb-2'>
        <div className='flex space-x-2 items-center'>
            <BsCalendarDate className='text-md'/> 
            <h1 className='font-semibold text-md'>{returnDate(date.date)}</h1>
        </div>
        <div className='flex space-x-2 items-center'>
            <FiClock className={`text-md ${date.availTime == -1 && "hidden"}`}/> 
            <h1 className={`font-semibold text-md ${date.availTime == -1 && "text-[#ee2c2c] text-sm font-semibold"}`}>{date.availTime != -1 ? returnTime(date.available_time) : "Not Available"}</h1>
        </div>
      </div>
      <div className='flex space-x-2 items-center'>
            <CiLocationOn className='text-md'/> 
            <h1 className='font-semibold text-md'>{hospital}</h1>
        </div>
    </div>
  )
}

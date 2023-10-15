import React, { useState } from 'react'
import { BsFillStarFill } from 'react-icons/bs'
import { Button } from './ui/button'

export default function DiagnosisContent({ diagnosisContent }) {

  return (
    <div className='my-4 px-4 py-4 shadow-lg rounded-md flex justify-around'>
      <div className='border-r border-gray-300 w-[70%]'>
        <h1 className='font-semibold text-xl cursor-pointer'>{diagnosisContent.name}</h1>
        <div className=' mb-2'>
        <p className='text-sm font-light underline cursor-pointer'>{diagnosisContent.hospitalName}</p>
          <div className='flex items-center my-2 space-x-2'>
            <div className='bg-[#2699b6] flex space-x-2 items-center px-2 py-1 rounded-full my-2'>
              <div className='mt-[-2px]'><BsFillStarFill /> </div>
              <p className='font-semibold'>{diagnosisContent.rating ? diagnosisContent.rating : 0}</p>
            </div>
          </div>
        </div>
        <p className='font-light w-[90%] overflow-wrap'><span className='text-md font-semibold'>Description : </span>{diagnosisContent.description}</p>
      </div>
      <div className='flex flex-col items-start justify-start'>
          <div className='flex-1 items-center'>
            <h1 className='font-semibold text-xl'>{diagnosisContent.price} Tk</h1>
            <p className='text-sm underline'>+10 Tk Service Charge</p>
          </div>
          <Button className="bg-[#2699b6] mb-4">Book Now</Button>
      </div>
    </div>
  )
}

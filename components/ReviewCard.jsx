"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function ReviewCard({ review }) {
  console.log(review)
  return (
    <div className='my-4 mx-4 p-3 rounded-md shadow-md bg-[#f0f0f0]'>
      <div className='justify-between flex items-center px-4'>
        <div className='flex items-center space-x-3'>
            <div className='relative w-12 h-12 rounded-full overflow-hidden'>
                <Image alt="User Image" src={"/defaultProfile.jpg"} layout="fill" objectFit="cover" />
            </div>
            <h1 className='text-md font-semibold'>{review.reviewerName}</h1>
        </div>
        <div className='flex space-x-1 items-center'>
            <h1 className='text-lg'>{review.starCount}</h1>
            <div className='relative w-32 h-16 overflow-hidden'>
                <Image alt="Review Image" src={`/${review.starCount}.png`} layout="fill" objectFit="cover" />
            </div>
        </div>
      </div>
      <h1 className='text-gray-500 px-16'>"{review.review}"</h1>
    </div>
  )
}

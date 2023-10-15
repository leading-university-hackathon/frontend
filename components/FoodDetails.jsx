"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { BiSolidDownArrow } from 'react-icons/bi'

export default function FoodDetails({ food }) {
  const [detail, setDetail] = useState(false)
  return (
    <div>
      <div onClick={() => setDetail(prev => !prev)} className='flex cursor-pointer space-x-12 items-center w-full rounded-lg py-3 shadow-lg my-4'>
        <div className="relative w-[10rem] h-[6rem] ">
            <Image src={food?.photo.thumb} layout="fill" objectFit="cover" alt="Food Image" />
        </div>
        <div className='items-center flex justify-between w-full px-4'> 
            <h1 className='uppercase text-lg'>{food?.food_name}</h1>
            <BiSolidDownArrow />
        </div>
      </div>
      {
        detail &&
        <div className='mb-6'>
            <h1 className='text-2xl my-4 font-bold'>Nutrition Facts</h1>
            <h2 className='my-2'><span className='font-bold'>Serving Size </span>: <span className='border border-gray-400 p-2'>{food?.serving_qty}</span>  {food?.serving_unit} {"(" + food?.serving_weight_grams + " " + "g" + ")"}</h2>
            <h1 className='font-bold text-lg border-b-2 border-black w-full'>Amounts Per Serving :</h1>
            <h1 className='my-3 flex justify-between text-2xl px-4'><span className='font-bold'>Calories :</span>  {food?.nf_calories} Kcal.</h1>
            <h1 className='my-3 flex justify-between text-2xl px-4'><span className='font-bold'>Total Fat :</span>  {food?.nf_total_fat || 0} g.</h1>
            <h1 className='my-3 flex justify-between text-2xl px-4'><span className='font-bold'>Saturated Fat :</span>  {food?.nf_saturated_fat || 0} g.</h1>
            <h1 className='my-3 flex justify-between text-2xl px-4'><span className='font-bold'>Cholesterol :</span>  {food?.nf_cholesterol || 0} mg.</h1>
            <h1 className='my-3 flex justify-between text-2xl px-4'><span className='font-bold'>Protein :</span>  {food?.nf_protein || 0} g.</h1>
            <h1 className='my-3 flex justify-between text-2xl px-4'><span className='font-bold'>Carbohydrate :</span>  {food?.nf_total_carbohydrate || 0} g.</h1>
            <h1 className='my-3 flex justify-between text-2xl px-4'><span className='font-bold'>Sugar :</span>  {food?.nf_sugars || 0} g.</h1>
            <h1 className='my-3 flex justify-between text-2xl px-4'><span className='font-bold'>Sodium :</span>  {food?.nf_sodium || 0} mg.</h1>
            <h1 className='my-3 flex justify-between text-2xl px-4'><span className='font-bold'>Dietary Fiber :</span>  {food?.nf_dietary_fiber || 0} g.</h1>
        </div>
      }
    </div>
  )
}

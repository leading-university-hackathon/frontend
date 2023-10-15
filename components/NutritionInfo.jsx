"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import loader from '@/components/LottieFiles/spinner_loading.json'  
import Lottie from "lottie-react"
import FoodNutrition from './FoodNutrition'


export default function NutritionInfo() {
  const [foodDescription, setFoodDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [foodItems, setFoodItems] = useState(null)

  async function handleNutritionChecker() {
    setLoading(true)
    const endpoint = 'https://trackapi.nutritionix.com/v2/natural/nutrients'
    const response = await fetch(`${endpoint}`, {
      method: 'POST',
      headers : {'Content-Type': 'application/json',
            'x-app-id' : process.env.NEXT_PUBLIC_NUTRITIONIX_APPLICATION_ID,
            'x-app-key' : process.env.NEXT_PUBLIC_NUTRITIONIX_APPLICATION_KEY
      
        },
      body : JSON.stringify({
        query : foodDescription
      })
    })
    const ans = await response.json()
    setFoodItems(ans.foods)
    setLoading(false)
    
  }
  return (
    <div className='p-8'>
        {!foodItems &&
            <div>
            <h1 className='mb-3 text-center text-xxl font-bold text-black dark:text-white sm:text-3xl'>Tell Us What You Are Planning Eat And We Will Give You Its Nutrition Information :</h1>
      
              <textarea value={foodDescription} onChange={e => setFoodDescription(e.target.value)} className="w-[50%] mx-auto flex justify-center p-4 rounded-md border border-gray-300 focus:outline-none focus:ring mt-16 mb-10 text-lg"
                  rows="4" />
              <Button onClick={handleNutritionChecker} className="bg-[#15648b] text-center mx-auto rounded-lg w-[30%] flex justify-center-center">
                  {loading ? <span className='w-full flex items-center justify-center'><Lottie className='w-16 text-center ' animationData={loader}/></span> : "Check Nutrition"}</Button>
          </div>
        }
        {foodItems &&
            <>
              <FoodNutrition foods={foodItems}/>
              <Button onClick={() => setFoodItems(null)} className="rounded-lg flex justify-center-center mx-auto my-8 ">Try Again</Button>
            </>
        }
    </div>
  )
}

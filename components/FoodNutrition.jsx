import React from 'react'
import FoodDetails from './FoodDetails'

export default function FoodNutrition({ foods }) {
    console.log(foods)
  return (
    <>
      <div>
        {foods?.map(food => <FoodDetails food={food}/>)}
      </div>
      
    </>
  )
}

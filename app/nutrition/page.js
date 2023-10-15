import Hero from '@/components/Hero'
import NutritionInfo from '@/components/NutritionInfo'
import React from 'react'

export default function page() {
  return (
    <div>
      <nav>
        <Hero />
      </nav>
      <NutritionInfo />
    </div>
  )
}

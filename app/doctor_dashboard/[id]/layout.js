import DoctorDashBoardHero from '@/components/DoctorDashBoardHero'
import React from 'react'

export default function layout({ params, children }) {
  return (
    <main>
      <DoctorDashBoardHero id={params.id} />
      <div>
        { children }
      </div>
    </main>
  )
}

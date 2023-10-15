import HospitalDashBoardHero from '@/components/HospitalDashBoardHero'
import React from 'react'

export default function layout({ params, children }) {
  return (
    <main>
      <HospitalDashBoardHero id={params.id} />
      <div>
        { children }
      </div>
    </main>
  )
}

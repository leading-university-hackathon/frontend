"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function HospitalDashBoardHero({ id }) {
  const pathname = usePathname()
  let path = pathname.split('/').pop()
  if(!isNaN(parseInt(path))) path = null
  const router = useRouter()
  
  function signOutHandler() {
    localStorage.removeItem('token');
    router.push('/')
  }
  return (
    <nav>
      <div className='justify-between px-8 py-4 flex items-center'>
        <div className='flex items-end text-base space-x-6'>
            <div className={`cursor-pointer hover:underline ${!path && "underline underline-offset-8 decoration-2"}`}><Link href={`/hospital_dashboard/${id}/`}>Dashboard</Link></div>
            <div className={`cursor-pointer hover:underline ${path == "upcoming" && "underline underline-offset-8 decoration-2"}`}><Link href={`/hospital_dashboard/${id}/upcoming`}>Upcoming Events</Link></div>
            <div className={`cursor-pointer hover:underline ${path == "pending" && "underline underline-offset-8 decoration-2"}`}><Link href={`/hospital_dashboard/${id}/pending`}>Reports Pending</Link></div>
            <div className={`cursor-pointer hover:underline ${path == "all" && "underline underline-offset-8 decoration-2"}`}><Link href={`/hospital_dashboard/${id}/all`}>Available Diagnoses</Link></div>
            <div className={`cursor-pointer hover:underline ${path == "add" && "underline underline-offset-8 decoration-2"}`}><Link href={`/hospital_dashboard/${id}/add`}>Add Diagnosis</Link></div>
            <div className={`cursor-pointer hover:underline ${path == "reviews" && "underline underline-offset-8 decoration-2"}`}><Link href={`/hospital_dashboard/${id}/reviews`}>Reviews</Link></div>
        </div>
        <div>
            <Button onClick={signOutHandler} className="rounded-full">Sign Out</Button>
        </div>
      </div>
    </nav>
  )
}

"use client"
import Hero from '@/components/Hero'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { usePathname } from 'next/navigation'

export default function RootLayout({ params, children }) {
  const pathname = usePathname()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    setProfile(token)   
  }, [])
  return (
    <main>
      <nav>
        <Hero />
      </nav>
      <div className='flex'>
        <div className='w-64 lg:w-96  min-h-screen overflow-auto text-white flex items-center flex-col border-r mx-auto border-r-gray-300 bg-gradient-to-r from-[#103153] to-[#0f2441]'>
          <div className="relative mt-8 w-32 h-32 rounded-full flex items-center overflow-hidden">
            <Image src="/defaultProfile.jpg" layout="fill" objectFit="cover" alt="Dashboard Image" />
          </div>
          <h1 className='text-xl text-white my-4'>Hi, {profile?.name}!</h1>
          <div  className={`${pathname === `/dashboard/${params.id}/prescription` ? "bg-white text-black" : ""} flex border-b border-b-[#f0f0f0] py-4 cursor-pointer justify-between px-8 w-full items-center`}>
              <Link className='h-full w-full' href={`/dashboard/${params.id}/prescription`}>Prescriptions</Link>
              <AiOutlineArrowRight />
          </div>
          <div  className={`${pathname === `/dashboard/${params.id}/upcoming` ? "bg-white text-black" : ""} flex border-b border-b-[#f0f0f0] py-4 cursor-pointer justify-between px-8 w-full items-center`}>
            <Link className='h-full w-full' href={`/dashboard/${params.id}/upcoming`}>Upcoming Events</Link>
              <AiOutlineArrowRight />
          </div>
          <div  className={`${pathname === `/dashboard/${params.id}/review` ? "bg-white text-black" : ""} flex border-b border-b-[#f0f0f0] py-4 cursor-pointer justify-between px-8 w-full items-center`}>
              <Link className='h-full w-full' href={`/dashboard/${params.id}/review`}>Review Section</Link>
              <AiOutlineArrowRight />
          </div>
          <div  className={`${pathname === `/dashboard/${params.id}/update` ? "bg-white text-black" : ""} flex border-b border-b-[#f0f0f0] py-4 cursor-pointer justify-between px-8 w-full items-center`}>
              <Link className='h-full w-full' href={`/dashboard/${params.id}/update`}>Update Information</Link>
              <AiOutlineArrowRight />
          </div>
        </div>
        <div className='flex-1 p-3'>
            {children}

        </div>
      </div>
    </main>
  )
}

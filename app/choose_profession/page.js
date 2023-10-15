"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Caveat } from 'next/font/google'
const caveat = Caveat({ subsets: ['latin'] })

export default function page() {

  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  return (
    <main className='min-h-screen flex flex-col items-center p-8 py-12'> 
      <p className='my-4 text-xl'>Let's get started! At first please tell us about your profession : </p>
      <div className='space-y-6 my-4 flex flex-col justify-center h-full mt-16'>
        <Link className='text-xl space-x-4 w-[24rem] text-center shadow-lg rounded-md px-4 py-2 items-center' href={"/choose_profession/doctor"}>I'm a Doctor</Link>
        <Link className=' text-xl space-x-4 w-[24rem] text-center shadow-lg rounded-md px-4 py-2 items-center' href={"/choose_profession/hospital"}>I have a hospital / clinic</Link>
      </div>
    
    </main>
  )
}

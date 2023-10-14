"use client"
import { downloadImage } from '@/components/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function layout({ children }) {
  const [url, setUrl] = useState(true)

  let token = localStorage.getItem("token")
  token = JSON.parse(token)

  async function handleSignOut(e) {
    e.preventDefault()
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  useEffect(() => {
    downloadImage(token.url, setUrl)
  }, [])

  return (
    <main>
      <nav className='flex border-b-2'>
        <div className='justify-between w-full flex px-8 py-4'>
            <div className='flex space-x-5 items-center'>
                <Link className='px-4 py-1 rounded-xl border border-gray-300' href={"/dashboard"}>Dashboard</Link>
                <Link className='px-4 py-1 rounded-xl border border-gray-300' href={"/dashboard/add"}>Add A New Recipe</Link>
            </div>
            <div className='flex items-center space-x-4'>
            //  <div className={`relative w-[4rem] h-[4rem] rounded-full overflow-hidden`}>
            //    <Image src={url} layout="fill" objectFit="cover" alt="Image" />
            //  </div>
              <button onClick={handleSignOut} className='px-4 py-2 rounded-full bg-[#000] text-white'>Sign Out</button>
            </div>
        </div>
      </nav>
      <div>
        { children }
      </div>
    </main>
  )
}

"use client"
import Link from 'next/link'

export default function page() {
  return (
    <main className='min-h-screen flex flex-col items-center p-8 py-12'> 
      <p className='my-4 text-xl'>Tell us about your profession : </p>
      <div className='space-y-6 my-4 flex flex-col justify-center h-full mt-16'>
        <Link className='text-xl space-x-4 w-[24rem] text-center shadow-lg rounded-md px-4 py-2 items-center' href={"/choose_profession/doctor"}>I'm a Doctor</Link>
        <Link className=' text-xl space-x-4 w-[24rem] text-center shadow-lg rounded-md px-4 py-2 items-center' href={"/choose_profession/hospital"}>I have a hospital / clinic</Link>
      </div>
    </main>
  )
}

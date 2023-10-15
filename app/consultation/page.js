"use client"
import DoctorsList from "@/components/DoctorsList";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function page() {
  const [doctorName, setDoctorName] = useState("")
  return (
    <>
    <Hero />
    <main className="flex flex-col items-center w-full min-h-screen">
      <div className="flex w-full justify-center items-center space-x-4 my-8">
        <input className="py-4 px-12 w-[640px] focus:outline-none border border-1 border-gray-600 rounded-full" type="text" onChange={e => setDoctorName(e.target.value)} placeholder="Search for your favorite doctor here" value={doctorName} />
        <Button variant="default" className="rounded-full">Search</Button>
      </div>
      <div>
        <DoctorsList doctorName={doctorName} />
      </div>
    </main>
  </>
  )
}

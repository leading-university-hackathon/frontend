"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import MedicineInput from './MedicineInput'
import Lottie from "lottie-react"
import loader from '@/components/LottieFiles/spinner_loading.json'  
import { useRouter } from 'next/navigation'

export default function Prescription({ setPrescription, doctorData, serialId, prescription }) {
  const [allMedicine, setAllMedicine] = useState([{}, ])
  const [instruction, setInstruction] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  function prescriptionSubmitHandler() {
    setPrescription(prev => [
        { medicine : allMedicine.slice(0, allMedicine.length - 1) },
        {instruction},
        {doctor : {
          name : doctorData.user.name,
          degrees : doctorData.degrees,
          currentHospital : doctorData.current_hospital
        }
        
        }
    ])
  }
  useEffect(() => {
    if(prescription) {
    setLoading(true)
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    fetch(`${endpoint}/doctor_serial/update/pres/${serialId}`, {
      method: 'PUT',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken },
      body: JSON.stringify({
        prescription : JSON.stringify(prescription)
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setInstruction("")
        router.back()
      })
    }

} , [prescription])
  return (
    <div className='flex items-center flex-col mt-32'>
      <h1 className='font-semibold text-xl my-4'>Prescription</h1>
      {allMedicine.map(( medicine, index ) => <MedicineInput key={index} medicine={medicine} setAllMedicine={setAllMedicine} />)}
      <div className='my-4 px-4 w-full mx-16'>
        <textarea className='focus:outline-none text-lg py-3 px-4 w-full border border-gray-400 rounded-md' type="text" value={instruction} onChange={(e) => setInstruction(e.target.value)} placeholder="Add Extra Instructions Here" />
      </div>
      <Button  onClick={prescriptionSubmitHandler} className={`bg-[#0f7c8a] round-lg text-lg h-12 w-48 flex text-center`}>{loading ? <span className="flex text-white items-center"><Lottie animationData={loader} className="h-16 w-16 -ml-8" /> {" "} Submitting</span>  : "Submit"}</Button>
    </div>
  )
}

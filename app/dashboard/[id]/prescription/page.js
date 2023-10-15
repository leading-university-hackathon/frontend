"use client"
import PrescriptionTable from '@/components/PrescriptionTable';
import { useEffect, useState } from 'react';
import LoaderEffect from '@/components/LoaderEffect';


export default function page({ params }) {
  const [prescriptions, setPrescriptions] = useState(null)


  useEffect(() => {
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    fetch(`${endpoint}/doctor_serial/pres/all`, {
      method: 'GET',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken }
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.detail != 'empty') {
          console.log(data)
          setPrescriptions(data)
        }
      })
  }, [])

  return (
    <>
      <div className='flex space-x-6 p-2 m-2'>
        {prescriptions && <PrescriptionTable prescriptions={prescriptions}/>}
        {!prescriptions &&
            <div className='h-screen w-full items-center justify-center flex'>
              <LoaderEffect />
            </div>
        }
      </div>
    </>
  )
}

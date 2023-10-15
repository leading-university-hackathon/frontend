"use client"
import React, { useEffect, useState } from 'react'
import DiagnosisContent from './DiagnosisContent'
import LoaderEffect from './LoaderEffect'

export default function DiagnosisList({ diagnosisInput }) {
  const [data, setData] = useState(null)
  const [allData, setAllData] = useState(null)
  useEffect(() => {
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    fetch(`${endpoint}/hospital/diagnosis/all`, {
      method: 'GET',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken }
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setAllData(data)
        console.log(data)
      })
  }, [])

  useEffect(() => {
    setData(allData)
    if(diagnosisInput != "") {
      setData(prev => prev?.filter(diagnosis => diagnosis.name.toLowerCase().includes(diagnosisInput.toLowerCase())))
    }
  }, [diagnosisInput])

  if(data && data.detail == 'empty') {
        return (
          <div className='flex-1'>
            <h1>No Diagnosis Found</h1>
          </div>
        )
      
  }

  if(data && data.detail != 'empty') {
    return (
      <div className='flex-1 mb-8'>
        {data?.map(diagnosis => <DiagnosisContent diagnosisContent={diagnosis} key={diagnosis.id} />)}
      </div>
    )
  }
  else {
    return (
      <div className='flex-1'>
        <LoaderEffect />
      </div>
    )
  }
}

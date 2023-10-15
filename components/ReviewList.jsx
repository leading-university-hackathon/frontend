"use client"
import { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'

export default function ReviewList({ id }) {
    const [data, setData] = useState(null)
    
    useEffect(() => {
      let token = localStorage.getItem("token")
      token = JSON.parse(token)
      const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
      fetch(`${endpoint}/review/${id}`, {
        method: 'GET',
        headers : {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.accessToken }
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.detail == 'empty') {
            setData(null)
          }
          else {
            setData(data)
            console.log(data)
          }
        })
    }, [])

  if(data && data?.detail != 'empty') {
    return (
      <div className='my-8 grid grid-cols-2'>
        {
          data?.map((review, index) => 
              <ReviewCard key={index} review={review} />
          )
        }
      </div>
    )
  }
  else {
    return (
      <div className='my-4 text-2xl text-white font-semibold justify-center w-full text-center '>
        <h1>No Reviews Found</h1>
      </div>
    )
  }
}

"use client"
import Lottie from 'lottie-react'
import loader from 'components/LottieFiles/loader.json'

export default function loading() {
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <Lottie animationData={loader} className='w-96 h-96'/>   
    </div>
  )
}

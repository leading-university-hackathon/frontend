"use client"
import Hero from "@/components/Hero"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { BsFillCameraVideoFill, BsHandIndex} from 'react-icons/bs' 
import { TbCircleLetterH } from 'react-icons/tb'
import { GiNotebook } from 'react-icons/gi' 
import { HiOutlineLocationMarker } from 'react-icons/hi' 
import { FaUserGraduate } from 'react-icons/fa' 
import ReviewList from "@/components/ReviewList"
import { returnTime, sendSMS } from "@/components/utils"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import DataCard from "@/components/DataCard"
import OfflineDataCard from "@/components/OfflineDataCard"
import { useRouter } from "next/navigation"
import LoaderEffect from "@/components/LoaderEffect"
import Lottie from "lottie-react"
import loader from '@/components/LottieFiles/spinner_loading.json' 


export default function page({ params }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [onlineSelected, setOnlineSelected] = useState(false)
  const [offlineSelected, setOfflineSelected] = useState(false)
  const router = useRouter()
  const random_number = Math.floor(Math.random() * (5)) + 1
  const url = `/doctor${random_number}.jpg`

  useEffect(() => {

    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    fetch(`${endpoint}/doctor/${params.id}`, {
      method: 'GET',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken }
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        console.log(data)
        setLoading(false)
      })
  }, [])

  async function onlineSerialHandler() {
    setLoading(true)
    let token = localStorage.getItem("token")
    token = JSON.parse(token)

    const serialData = {
      "type":"online",
      "price":data.online_fee + 10,
      "appointmentDate": onlineSelected.date,
      "time": onlineSelected.available_time,
      "doctor_id": data.user.id
    }

    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    const response = await fetch(`${endpoint}/doctor_serial/add`, {
      method: 'POST',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken
    },
      body : JSON.stringify(serialData)
    })
    let ans = await response.json()
    setLoading(false)
    setTimeout(() => {
      window.location.reload()
    }, 600)
  }

  async function offlineSerialHandler() {
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    setLoading(true)
    const serialData = {
      "type":"offline",
      "price": data.offline_fee + 10,
      "appointmentDate": offlineSelected.date,
      "time": offlineSelected.available_time,
      "doctor_id": data.user.id
    }
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    const response = await fetch(`${endpoint}/doctor_serial/add`, {
      method: 'POST',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken
    },
      body : JSON.stringify(serialData)
    })
    let ans = await response.json()
    console.log(ans)
    setLoading(false)
    sendSMS(token.phone, `Payment is successful for an appointment with Dr. ${data.user.name} at ${returnTime(offlineSelected.available_time)}, ${offlineSelected.date}.Please keep this SMS for further reference`)
    setTimeout(() => {
        window.location.reload()
    }, 600)
    

  }

  return (
    <main className="h-full bg-gradient-to-r from-[#40a1ce] to-[#bfecfa] overflow-auto">
      <nav className="bg-white">
        <Hero />
      </nav>
      <div className="flex space-x-6 items-center justify-center mt-[5%]">
          <Dialog className="w-96">
            <DialogTrigger>
            <Button className="text-xl p-8 rounded-full"><span className="mr-4"><BsFillCameraVideoFill/></span>Take Online Consultation</Button>
             </DialogTrigger>
            <DialogContent className="p-12 w-96 flex flex-col items-center">
              <DialogHeader className={`mx-auto font-bold text-xl text-center w-full flex items-center`}>Pick A Suitable Schedule</DialogHeader>
                <div className='flex flex-col space-y-4 w-96 h-96 overflow-auto'>
                  {
                    data?.availableOnlineTimes.map(date => <DataCard setOnlineSelected={setOnlineSelected} onlineSelected={onlineSelected} availableOnlineTimes={data?.availableOnlineTimes.filter(time => time.available_time != -1)} key={date.id} date={date} />)
                  }
                </div>
                {onlineSelected ?
                  <div className="w-full flex">
                    <Button onClick={onlineSerialHandler} className="w-full px-4 py-6 rounded-full text-2xl">
                      {!loading &&
                          <>
                            Pay <span className="font-semibold ml-4">{data?.online_fee + 10}</span>{" "} Tk<span className="ml-4"><BsHandIndex className="text-lg" /></span> 
                          </>
                      }
                      {loading &&
                          <>
                            <span className='w-full flex items-center justify-center'><Lottie className='w-24 text-center' animationData={loader}/></span> 
                          </>
                      }
                    </Button>
                  </div> :
                  <div className="w-full flex">
                    <Button className="w-full px-4 py-6 rounded-full text-2xl">No Date Selected</Button>
                  </div> 
                }
            </DialogContent>
          </Dialog>
          <Dialog className="w-96">
            <DialogTrigger>
            <Button className="text-xl p-8 rounded-full"><span className="mr-4"><GiNotebook/></span>Book An Appointment</Button>
             </DialogTrigger>
            <DialogContent className="p-12 w-96 flex flex-col items-center">
              <DialogHeader className={`mx-auto font-bold text-xl text-center w-full flex items-center`}>Pick A Suitable Schedule</DialogHeader>
                <div className='flex flex-col space-y-4 w-96 h-96 overflow-auto'>
                  {
                    data?.availableOfflineTimes.map(date => <OfflineDataCard setOfflineSelected={setOfflineSelected} hospital={data?.current_hospital} offlineSelected={offlineSelected} availableTimes={data?.availableOfflineTimes.filter(time => time.available_time != -1)} key={date.id} date={date} />)
                  }
                </div>
                {offlineSelected ?
                  <div className="w-full flex">
                    <Button onClick={offlineSerialHandler} className="w-full px-4 py-6 rounded-full text-2xl">
                      {!loading &&
                       <>
                       Pay <span className="font-semibold ml-4">{data?.offline_fee + 10}</span>{" "} Tk<span className="ml-4"><BsHandIndex className="text-lg" /></span>
                       </>
                      }
                      {loading &&
                          <>
                            <span className='w-full flex items-center justify-center'><Lottie className='w-24 text-center' animationData={loader}/></span> 
                          </>
                      }
                    </Button>
                  </div> :
                  <div className="w-full flex">
                    <Button disabled={true} className="w-full px-4 py-6 rounded-full text-2xl">No Date Selected</Button>
                  </div> 
                }
            </DialogContent>
          </Dialog>

      </div>
      <div className="flex w-4/5 justify-between bg-[#f0f0f0] mt-12 mx-auto">
        {data &&
          <div className="p-8">
          <div className="flex space-x-2 items-center">
            <div className="text-3xl bg-black text-white rounded-full"><TbCircleLetterH/></div>
            <h1>PROFILE</h1>
          </div>
          {data && <div className="flex items-center space-x-6">
                        <h1 className="my-4 text-4xl font-bold">{data?.user.name}</h1>
                        <h1 className="my-4 text-lg font-semibold px-4 py-2 text-white rounded-full bg-[#3668d3] text-center inline">{data?.expertise?.toUpperCase()}</h1>
                      </div>}
                    <div className="flex items-center space-x-6">
                      <div className="relative w-[1rem] h-[1rem] overflow-hidden">
                        <Image src={"/star_vector.png"} layout="fill" objectFit="cover" alt="Star Image" />
                      </div>
                      <h1 className="my-2"><span className="font-semibold">{data?.rating || 0} / 5</span>{" "}<span className="underline font-semibold text-lg">Rating</span></h1>
                    </div>
                    <div className="flex space-x-12 items-center">
                      <div className="flex space-x-4">
                        <HiOutlineLocationMarker className="text-xl" />
                        <h1 className="font-semibold">{data?.current_hospital?.toUpperCase()}, {data?.place?.toUpperCase()}</h1>
                      </div>
                      <div className="flex space-x-2 items-center">
                        <FaUserGraduate className="text-lg" />
                        <h1 className="my-2 text-lg font-semibold">{data?.degrees}</h1>
                      </div>
                    </div>
                    <h1 className="my-2 text-lg grow">Description : "{data?.bio}" </h1>
                    <div className="space-x-6 mt-4 flex">
                      <h1 className="px-4 py-2 rounded-full bg-[#3668d3] text-white font-semibold">Offline Fee : <span className="font-bold">{data?.offline_fee + 10}</span> Tk</h1>
                      <h1 className="px-4 py-2 rounded-full bg-[#3668d3] text-white font-semibold">Online Fee : <span className="font-bold">{data?.online_fee + 10}</span> Tk</h1>
                    </div>
                  </div>
        }
        {!data && <LoaderEffect />}
        <div className={`relative w-[32rem] h-[24rem] overflow-hidden`}>
          <Image src={url} layout="fill" objectFit="cover" alt="Doctor's Image" />
        </div>
      </div>
      <h1 className="px-3 py-2 mx-auto text-white text-5xl font-bold underline my-8 rounded-full text-center">Reviews</h1>
      <ReviewList id={params.id} />
    </main>
  )
}

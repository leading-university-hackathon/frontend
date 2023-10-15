"use client"
import { useRouter } from "next/navigation"
import Lottie from "lottie-react";
import loader from '@/components/LottieFiles/spinner_loading.json' 
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export default function page() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [selectedCity, setSelectedCity] = useState("dhaka")
  const [description, setDescription] = useState("")
  const [hospitalName, setHospitalName] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    let fileName = "default.jpg"
    const data = {
      user : {
        name,
        email,
        password,
        phone,
        url : fileName
      },
      hospitalName,
      bio : description,
      place : selectedCity
    }
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    const response = await fetch(`${endpoint}/hospital/signup`, {
      method: 'POST',
      headers : {'Content-Type': 'application/json'},
      body : JSON.stringify(data)
    })
    
    const ans = await response.json()
    setLoading(false)
    router.push("/login")
  }

  return (
    <main className="min h-screen overflow-y-scroll p-8 flex flex-col items-center bg-gradient-to-r from-[#40a1ce] to-[#bfecfa]">
      <h1 className="font-semibold text-2xl">Register Your Profile</h1>
      <p className="my-2 text-xl">Please Fill Up All The Required Details Carefully</p>
      <p>----------------------------------------------------------------------------------------------------------------------------------------------------</p>
      <div>
        <div className="w-full px-4 flex justify-start p-2 items-center">
            <input required className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" onChange={e => setName(e.target.value)} type="text" placeholder="Your Name" value={name}/>
        </div>
        <div className="w-full px-4 flex justify-start p-2 items-center">
            <input required className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" onChange={e => setHospitalName(e.target.value)} type="text" placeholder="Your Hospital Name" value={hospitalName}/>
        </div>
        <div className="w-full px-4 flex justify-start p-2 items-center">
            <input required className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" value={email}/>
        </div>
        <div className="w-full px-4 flex justify-start p-2 items-center">
            <input required className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" value={password}/>
        </div>
        <div className="w-full px-4 flex justify-start p-2 items-center">
            <input required className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" onChange={e => setPhone(e.target.value)} type="phone" placeholder="Contact Number" value={phone}/>
        </div>

        <div className="w-full px-4 justify-start p-2 items-center">
          <label className="font-semibold w-full"  htmlFor="city">Which City The Hospital is Situated In : </label>
          <select id="city" value={selectedCity} onChange={e => setSelectedCity(e.target.value)} className="w-full mt-3 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" name="city">
            <option value="dhaka">Dhaka</option>
            <option value="chittagong">Chittagong</option>
            <option value="khulna">Khulna</option>
            <option value="rajshahi">Rajshahi</option>
            <option value="sylhet">Sylhet</option>
            <option value="barisal">Barisal</option>
            <option value="rangpur">Rangpur</option>
            <option value="comilla">Comilla</option>
          </select>
        </div>
        <div className="w-full px-4 flex justify-start p-2 items-center">
            <input className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" onChange={e => setDescription(e.target.value)} type="description" placeholder="Tell Us A Little Bit About Your Hospital" value={description}/>
        </div>
      </div>
      <Button onClick={handleSubmit} className="rounded-lg flex items-center justify-center my-5">{loading ? <span><Lottie className="flex items-center text-center justify-center w-16" animationData={loader}/></span> : "Submit"}</Button>
    </main>
  )
}

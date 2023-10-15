"use client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import OfflineScheduleTable from "@/components/OfflineScheduleTable"
import OnlineScheduleTable from "@/components/OnlineScheduleTable"
import Lottie from "lottie-react";
import loader from '@/components/LottieFiles/spinner_loading.json' 
import { Button } from "@/components/ui/button"

export default function page() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [emailInput, setEmail] = useState("")
  const [passwordInput, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [hospitalName, setHospitalName] = useState("")
  const [selectedCity, setSelectedCity] = useState("dhaka")
  const [degrees, setDegrees] = useState("")
  const [description, setDescription] = useState("")
  const [doctorsFee, setDoctorsFee] = useState("")
  const [onlineDoctorsFee, setOnlineDoctorsFee] = useState("")
  const [expertise, setExpertise] = useState("")
  const [bmdc, setBmdc] = useState("")
  const [onlineSchedule, setOnlineSchedule] = useState([])
  const [offlineSchedule, setOfflineSchedule] = useState([])
  const [loading, setLoading] = useState(false)
  
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    let fileName = "default.jpg"
    const data = {
      user : {
        name,
        email: emailInput,
        password: passwordInput,
        phone,
        url : fileName
      },
      expertise : expertise,
      online_fee : onlineDoctorsFee,
      offline_fee : doctorsFee,
      place : selectedCity,
      current_hospital : hospitalName,
      degrees,
      bio : description,
      availableOfflineTimes : offlineSchedule,
      availableOnlineTimes : onlineSchedule,
      bmdc
    }
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    const response = await fetch(`${endpoint}/doctor/signup`, {
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
            <input required className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" onChange={e => setName(e.target.value)} type="text" placeholder="Enter Your Name" value={name}/>
        </div>
        <div className="w-full px-4 flex justify-start p-2 items-center">
            <input required className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" value={emailInput}/>
        </div>
        <div className="w-full px-4 flex justify-start p-2 items-center">
            <input required className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" value={passwordInput}/>
        </div>
        <div className="w-full px-4 flex justify-start p-2 items-center">
            <input required className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" onChange={e => setPhone(e.target.value)} type="phone" placeholder="Contact Number" value={phone}/>
        </div>
        <div className="w-full px-4 flex justify-start p-2 items-center">
            <input required className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" onChange={e => setBmdc(e.target.value)} type="text" placeholder="Enter Your BMDC Number" value={bmdc}/>
        </div>
        <div className="w-full px-4 flex justify-start p-2 items-center">
            <input required className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" onChange={e => setDoctorsFee(e.target.value)} type="text" placeholder="Set Your Fees For Offline Appointments" value={doctorsFee}/>
        </div>
        <div className="w-full px-4 flex justify-start p-2 items-center">
            <input required className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" onChange={e => setOnlineDoctorsFee(e.target.value)} type="text" placeholder="Set Your Fees For Online Appointments" value={onlineDoctorsFee}/>
        </div>
        <div className="w-full px-4 flex justify-start p-2 items-center">
          <label className="w-full my-4 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" htmlFor="city">Which City Do You Practice Currently : </label>
          <select id="city" value={selectedCity} onChange={e => setSelectedCity(e.target.value)} className="w-full my-4 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" name="city">
            <option value="dhaka">Dhaka</option>
            <option value="chittagong">Chittagong</option>
            <option value="khulna">Khulna</option>
            <option value="rajshahi">Rajshahi</option>
            <option value="sylhet">Sylhet</option>
            <option value="barisal">Barisal</option>
            <option value="rangpur">Rangpur</option>
            <option value="comilla">Comilla</option>
            <option value="mymensingh">Mymensingh</option>
            <option value="coxsbazar">Cox's Bazar</option>
            <option value="khagrachari">Khagrachari</option>
            <option value="bogra">Bogra</option>
            <option value="savar">Savar</option>
            <option value="narayanganj">Narayanganj</option>
            <option value="rangamati">Rangamati</option>
            <option value="jamalpur">Jamalpur</option>
            <option value="barishal">Barishal</option>
            <option value="feni">Feni</option>
            <option value="jessore">Jessore</option>
            <option value="munshiganj">Munshiganj</option>
          </select>
        </div>
        <div className="w-full px-4 flex justify-start p-2 items-center">
          <label className="w-full my-4 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" htmlFor="expertise">Tell Us About Your Expertise: </label>
          <select id="expertise" value={expertise} onChange={e => setExpertise(e.target.value)} className="w-full my-4 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" name="city">
            <option value="psychiatrist">Psychiatrist</option>
            <option value="cardiologist">Cardiologist</option>
            <option value="dermatologist">Dermatologist</option>
            <option value="endocrinologist">Endocrinologist</option>
            <option value="gastroenterologist">Gastroenterologist</option>
            <option value="hematologist">Hematologist</option>
            <option value="nephrologist">Nephrologist</option>
            <option value="neurologist">Neurologist</option>
            <option value="oncologist">Oncologist</option>
            <option value="ophthalmologist">Ophthalmologist</option>
          </select>
        </div>
        <div className="w-full px-4 flex justify-start p-2 items-center">
            <input required className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" onChange={e => setHospitalName(e.target.value)} type="text" placeholder="Hospital You're currently Working In" value={hospitalName}/>
        </div>
        <div className="w-full px-4 flex justify-start p-2 items-center">
            <input className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" onChange={e => setDegrees(e.target.value)} type="text" placeholder="Your Achieved Degrees" value={degrees}/>
        </div>
        <div className="w-full px-4 flex justify-start p-2 items-center">
            <input className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" onChange={e => setDescription(e.target.value)} type="description" placeholder="Tell Us About Yourself and Your Qualities" value={description}/>
        </div>
      <div className="my-16">
        <h1 className="text-xl my-4 font-semibold">Tell us about your offline practice schedule : (You can change it later)</h1>
        <OfflineScheduleTable setOfflineSchedule={setOfflineSchedule}/>
      </div>
      <div className="my-16">
        <h1 className="text-xl my-4 font-semibold">Tell us about your online practice schedule : (You can change it later)</h1>
        <OnlineScheduleTable setOnlineSchedule={setOnlineSchedule} />
      </div>
      </div>
      
      <Button onClick={handleSubmit} className="rounded-lg flex items-center justify-center">{loading ? <span><Lottie className="flex w-16 items-center text-center justify-center" animationData={loader}/></span> : "Submit"}</Button>
    </main>
  )
}

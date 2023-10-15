"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { returnTime, sendSMS } from "./utils"
import { useRouter } from "next/navigation"
  
export default function MeetingTable({ meeting }) {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState([])
  const [doctor, setDoctor] = useState(null)
  const router = useRouter()

  useEffect(() => {
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    fetch(`${endpoint}/doctor_serial/upcoming `, {
      method: 'GET',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken }
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.type == "empty") setPatients(null)
        else setPatients(data)
        console.log(data)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    fetch(`${endpoint}/doctor/${token.id}`, {
      method: 'GET',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken }
    })
      .then((res) => res.json())
      .then((data) => {
        setDoctor(data)
        console.log(data)
      })
  }, [])

  async function patientCallHandler(type, patient) {
    setLoading(true)
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT

    fetch(`${endpoint}/doctor_serial/check/${patient.id}`, {
      method: 'PUT',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setLoading(false)
      })
      
    if(type == "online") {
      router.push(`/video/doctor/${token.id}?serialId=${patient.id}`)
    }
    else {
      sendSMS(token.phone, `Dr. ${doctor.user.name} is calling you inside the chamber for an appointment which was scheduled at ${returnTime(patient.time)} `)
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
    
  }
  
  async function refundHandler(id) {
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    fetch(`${endpoint}/doctor_serial/delete/${id}`, {
      method: 'DELETE',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setTimeout(() => {
            window.location.reload()
        }, 600)
      })
  }

return (
    <Table className="border border-gray-500 rounded-lg">
    <TableCaption>Your Upcoming {meeting} Meetings List </TableCaption>
    <TableHeader>
        <TableRow>
        <TableHead className="w-[200px] text-center">Patient Name</TableHead>
        <TableHead className="w-[200px] text-center">Scheduled Time</TableHead>
        <TableHead className="w-[100px]"></TableHead>
        <TableHead className="w-[100px]"></TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {patients && patients?.map((patient) =>{ if (patient.type == meeting) return (
        <TableRow key={patient.id}>
            <TableCell className="w-[200px] text-center">{patient.patientName}</TableCell>
            <TableCell className="w-[200px] text-center">{returnTime(patient.time)}</TableCell>
            <TableCell className="w-[100px]"><Button onClick={() => patientCallHandler(patient.type == "online" ? "online" : "offline", patient)} className="bg-[#2a818d]">{patient.type == "online" ? "Join Meeting" : "Ask Patient to Enter"}</Button></TableCell>
            <TableCell className="w-[100px]"><Button onClick={() => refundHandler(patient.id)} className="bg-[#e62807]">Refund</Button></TableCell>
        </TableRow>
        )})}
    </TableBody>
    </Table>
)
}
  
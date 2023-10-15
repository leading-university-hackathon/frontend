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
import { useState } from "react"
  
let offlineData = [
    {
      id : 1,
      day : "Sunday",
      checked : false,
      start_time : null,
      end_time : null
    },
    {
      id : 2,
      day : "Monday",
      checked : false,
      start_time : null,
      end_time : null
    },
    {
      id : 3,
      day : "Tuesday",
      checked : false,
      start_time : null,
      end_time : null
    },
    {
      id : 4,
      day : "Wednesday",
      checked : false,
      start_time : null,
      end_time : null
    },
    {
      id : 5,
      day : "Thursday",
      checked : false,
      start_time : null,
      end_time : null
    },
    {
      id : 6,
      day : "Friday",
      checked : false,
      start_time : null,
      end_time : null
    },
    {
      id : 7,
      day : "Saturday",
      checked : false,
      start_time : null,
      end_time : null
    }
  ]
export default function OfflineScheduleTable({ setOfflineSchedule }) {

  function handleScheduleAdd(schedule, setClicked) {
    if(schedule.start_time === "") {
      setClicked(prev => false)
      return
    }
    if(schedule.end_time === "") {
      setClicked(prev => false)
      return
    }
    setOfflineSchedule(prev => [...prev, 
    {
      day : schedule.day,
      start_time : parseFloat(schedule.start_time.replace(":", ".")),
      end_time : parseFloat(schedule.end_time.replace(":", ".")),
      available_time : 0,
      date : new Date().toISOString().split('T')[0]
    }
    ])
    
      
  }
return (
    <Table className="border border-gray-500 rounded-lg">
    <TableCaption className="text-black">Fix Your Offline Schedule</TableCaption>
    <TableHeader>
        <TableRow>
        <TableHead className="w-[200px] text-center text-lg text-black">Day</TableHead>
        <TableHead className="w-[200px] text-center text-lg text-black">Start Time</TableHead>
        <TableHead className="w-[200px] text-center text-lg text-black">End Time</TableHead>
        <TableHead className="w-[200px] text-center"></TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
      {offlineData.map((schedule) => { 
        const [start_time, setstart_time] = useState("")
        const [end_time, setend_time] = useState("")
        const [clicked, setClicked] = useState("")

        return (
        <TableRow key={schedule.id}>
            <TableCell className="w-[200px] text-center">{schedule.day}</TableCell>
            <TableCell className="w-[200px] text-center">
              <input onChange={(e) => setstart_time(e.target.value)} value={start_time} className="focus:outline-none p-2 rounded-md" type="time" />  
            </TableCell>
            <TableCell className="w-[200px] text-center">
              <input onChange={(e) => setend_time(e.target.value)} value={end_time} className="focus:outline-none p-2 rounded-md" type="time" />  
            </TableCell>
            <TableCell className="w-[200px] text-center"><Button onClick= {
              () => { 
                  setClicked(prev => !prev)
                  schedule = {...schedule, start_time : start_time, end_time : end_time, checked : true}
                  handleScheduleAdd(schedule, setClicked)
              }
            } 
              className={`${clicked ? "bg-[#0a4d1a]" : "bg-[#2a818d]"}`}>{clicked ? "Added" : "Add"}</Button></TableCell>
        </TableRow>
      )})}
    </TableBody>
    </Table>
)
}
  
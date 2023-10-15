"use client"
import MeetingTable from '@/components/MeetingTable'

export default function page() {
  return (
      <div className='grid grid-cols-2 gap-4 p-4'>
        <div>
          <MeetingTable meeting="offline"/>
        </div>
        <div>
          <MeetingTable meeting="online"/>
        </div>
      </div>

  )
}

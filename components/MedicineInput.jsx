import React, { useState } from 'react'
import { Button } from './ui/button'

export default function MedicineInput({ medicine, setAllMedicine }) {
  const [medicineName, setMedicineName] = useState("")
  const [rule, setRule] = useState("")
  function addMedicineHandler() {
    medicine["medicineName"] = medicineName
    medicine["rule"] = rule
    setAllMedicine(medicines => [...medicines, {}])
  }
  return (
    <div className='my-2 p-2 space-x-4 flex items-center'>
        <input className='focus:outline-none text-lg px-4 py-1' type="text" value={medicineName} onChange={(e) => setMedicineName(e.target.value)} placeholder="Medicine Name" />
        <input className='focus:outline-none text-lg px-4 py-1' type="text" value={rule} onChange={(e) => setRule(e.target.value)} placeholder="Medication Rules" />
        <Button onClick={addMedicineHandler}>Add The Medicine</Button>
    </div>
  )
}

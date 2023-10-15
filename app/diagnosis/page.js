"use client"
import DiagnosisList from "@/components/DiagnosisList";
import Hero from "@/components/Hero";

export default function page() {
  const [diagnosisInput, setDiagnosisInput] = useState("")
  
  return (
    <main className="">
      <nav className="bg-white">
        <Hero />
      </nav>
      <div className='flex space-x-2 items-center'>
        <input type="text" value={diagnosisInput} onChange={e => setDiagnosisInput(e.target.value)} placeholder={"Search For Diagnosis Here"} className="h-[3rem] z-10 overflow-wrap px-4 w-80 focus:outline-none bg-white text-black placeholder:text-gray-400 border border-gray-300 rounded-full" />
        <Button className="rounded-full bg-[#2699b6]">Search</Button>
      </div>
      <div className="flex mt-8">
        <DiagnosisList diagnosisInput={diagnosisInput} />
      </div>
    </main>
  )
}

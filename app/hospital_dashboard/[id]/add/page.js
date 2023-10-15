"use client"
import { useState } from "react";
import Lottie from "lottie-react";
import loader from '@/components/LottieFiles/spinner_loading.json' 
import { Button } from "@/components/ui/button"


export default function page() {
  const [diagnosisName, setDiagnosisName] = useState("")
  const [diagnosisDescription, setDiagnosisDescription] = useState("")
  const [diagnosisCost, setDiagnosisCost] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const data = {
      name : diagnosisName,
      description : diagnosisDescription,
      price : parseInt(diagnosisCost),
    }
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    const response = await fetch(`${endpoint}/hospital/add/diagnosis`, {
      method: 'POST',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken
    },
      body : JSON.stringify(data)
    })
    console.log(data)
    const ans = await response.json()
    setLoading(false)
    setDiagnosisName("")
    setDiagnosisDescription("")
    setDiagnosisCost("")
  }
  return (
    <main className="min-h-screen">
      <section className="relative z-10 pb-16 md:pb-20 lg:pb-28 min-h-screen">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 mt-8 ">
              <div className="mx-auto max-w-[500px] rounded-md bg-[#40a1ce] py-10 px-6 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Add a new diagnosis
                </h3>
                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color sm:block"></span>
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color sm:block"></span>
                </div>
                <form>
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Diagnosis Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="enter diagnosis name"
                      className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      value={diagnosisName}
                      onChange={e => setDiagnosisName(e.target.value)}
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="description"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Diagnosis Description
                    </label>
                    <input
                      type="description"
                      name="description"
                      placeholder="Give a description"
                      className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      value={diagnosisDescription}
                      onChange={e => setDiagnosisDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="price"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Diagnosis Cost
                    </label>
                    <input
                      type="text"
                      name="price"
                      placeholder="cost"
                      className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      value={diagnosisCost}
                      onChange={e => setDiagnosisCost(e.target.value)}
                    />
                  </div>
                  <div className="mb-6 flex items-center justify-center">
                    <Button onClick={handleSubmit} className="rounded-lg w-64 flex items-center justify-center">{loading ? <span><Lottie className="flex items-center h-12 w-12 text-center justify-center" animationData={loader}/></span> : "Add Diagnosis"}</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};


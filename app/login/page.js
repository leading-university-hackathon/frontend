"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function page() {
  const [emailInput, setEmail] = useState("")
  const [passwordInput, setPassword] = useState("")
  const router = useRouter()
  async function handleSubmit(e) {
    e.preventDefault()
    const data = {
      email: emailInput,
      password: passwordInput
    }
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    const response = await fetch(`${endpoint}/signin`, {
      method: 'POST',
      headers : {'Content-Type': 'application/json'
    },
      body : JSON.stringify(data)
    })
    const ans = await response.json()
    localStorage.setItem('token', JSON.stringify(ans))
    if(ans.role == "USER") {
       router.push(`/dashboard/${ans.id}/upcoming`)
    }
    if(ans.role == "DOCTOR") {
      router.push(`/doctor_dashboard/${ans.id}`)
    }
    if(ans.role == "HOSPITAL") {
      router.push(`/hospital_dashboard/${ans.id}`)
    }
  }
  return (
    <main className="h-screen w-full">
    <section className="relative z-10 h-screen overflow-hidden pb-16 md:pb-20 lg:pb-28 bg-gradient-to-r">
        <div className="container mt-16">
          <div className="-mx-4 flex items-center justify-center flex-wrap">
            <div className="w-full px-4 mt-8">
              <div className="mx-auto max-w-[500px] rounded-md bg-[#4A6CF7] bg-opacity-10 py-10 px-6 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Sign in to your account
                </h3>
                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color sm:block"></span>
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color sm:block"></span>
                </div>
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      value={emailInput}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Your Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      value={passwordInput}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>               
                  <div className="mb-6">
                    <Button onClick={handleSubmit} className="flex w-full items-center justify-center rounded-md bg-primary py-7 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">Sign In</Button>
                  </div>
                <p className="text-center text-base font-medium text-body-color">
                  Don’t you have an account ? {`${" "}`}
                  <Link href="/signup" className="text-primary underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
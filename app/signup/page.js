"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Lottie from "lottie-react"
import robotLoader from "@/components/LottieFiles/robot_loader.json"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { uploadImage } from "@/components/utils"

export default function page() {
  const [name, setName] = useState("")
  const [emailInput, setEmail] = useState("")
  const [passwordInput, setPassword] = useState("")
  const [image, setImage] = useState(null)

  const router = useRouter()
  async function handleSubmit(e) {
    e.preventDefault()
    let fileName = "default.jpg"
    if(image) {
      fileName = new Date().getTime() + image.name
      uploadImage(image, fileName)
    }
    const data = {
      name : name,
      email: emailInput,
      password: passwordInput,
      url : fileName
    }
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    const response = await fetch(`${endpoint}/signup`, {
      method: 'POST',
      headers : {'Content-Type': 'application/json'
    },
      body : JSON.stringify(data)
    })
    router.push('/login')
  }
  return (
    <main className="h-screen w-full">
        <div className="flex w-full">
          <div className="w-[50%]">
            <section className="relative z-10 h-screen overflow-hidden pb-16 md:pb-20 lg:pb-28 bg-gradient-to-r">
            <div className="container mt-16">
              <div className="-mx-4 flex items-center justify-center flex-wrap">
                <div className="w-full px-4 mt-8">
                  <div className="mx-auto max-w-[500px] rounded-md bg-[#4A6CF7] bg-opacity-10 py-10 px-6 dark:bg-dark sm:p-[60px]">
                    <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                      Create Your Account From Here
                    </h3>
                    <div className="mb-8 flex items-center justify-center">
                      <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color sm:block"></span>
                      <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color sm:block"></span>
                    </div>
                    <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your Name"
                      className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
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
                      <div className="w-full px-4 flex justify-start items-center text-white font-semibold">
                        <label className="w-3/4 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" htmlFor="imageInput">{image ? "Chosen File :" : "Upload Your Image :"}</label>
                        <input className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" onChange={e => setImage(e.target.files[0])} id="imageInput" type="file" placeholder="Upload Your Image Here"/>
                      </div>              
                      <div className="mb-6">
                        <Button onClick={handleSubmit} className="flex w-full items-center justify-center rounded-md bg-primary py-7 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">Sign Up</Button>
                      </div>
                    <p className="text-center text-base font-medium text-body-color">
                      Already have an account ? {`${" "}`}
                      <Link href="/login" className="text-primary underline">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 z-[-1]">
              <svg
                width="1440"
                height="969"
                viewBox="0 0 1440 969"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_95:1005"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="1440"
                  height="969"
                >
                  <rect width="1440" height="969" fill="#090E34" />
                </mask>
                <g mask="url(#mask0_95:1005)">
                  <path
                    opacity="0.1"
                    d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                    fill="url(#paint0_linear_95:1005)"
                  />
                  <path
                    opacity="0.1"
                    d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                    fill="url(#paint1_linear_95:1005)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_95:1005"
                    x1="1178.4"
                    y1="151.853"
                    x2="780.959"
                    y2="453.581"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4A6CF7" />
                    <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_95:1005"
                    x1="160.5"
                    y1="220"
                    x2="1099.45"
                    y2="1192.04"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4A6CF7" />
                    <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </section>
          </div>
          <div className="w-[50%]">
            <Lottie className="h-screen" animationData={robotLoader}/>
          </div>
        </div>
    </main>
  )
}
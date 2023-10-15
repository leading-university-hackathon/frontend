"use client"
import { Oswald } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { AiOutlineMenu } from 'react-icons/ai'
import { usePathname, useRouter } from 'next/navigation'
import { BsFillBellFill } from 'react-icons/bs'



const caveat = Oswald({ subsets: ['latin'] })

export default function Hero({ landing = false}) {
  const pathname = usePathname()
  const [signedIn, setSignedIn] = useState(false)
  const [token, setToken] = useState(false)
  const router = useRouter()
  console.log(pathname)
  useEffect(() => {
    let token = localStorage.getItem("token")
    if(token) {
      setSignedIn(true)
    }
    token = JSON.parse(token)
    setToken(token)
  }, [])
  function signOutHandler() {
    localStorage.removeItem('token');
    router.push('/')
    setSignedIn(false)
  }

  function TokenCheckHandler(url) {
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    if(!token) {
      router.push("/login")
    }
    else {
      router.push(url)
    }
  }
  return (
    <>
      <div className='hidden md:flex justify-between items-center bg-black px-8 py-4'>
      <div>
        <Link href={'/'} className={`${caveat.className} text-white tracking-wider text-2xl font-bold`} ><h1>MediNest</h1></Link>
      </div>
      <div className='space-x-4 flex'>
        <p onClick={() => TokenCheckHandler("/ai")} className={`${pathname == '/ai' && "outline text-white outline-1 outline-white"} hover:outline text-white cursor-pointer outline-1 outline-gray-700 py-2 px-4 rounded-lg transition-all .5s`}>
          AI Consultation
        </p>
        <p onClick={() => TokenCheckHandler("/consultation")} className={`${pathname == '/consultation' && "outline outline-1 outline-white"} hover:outline text-white cursor-pointer outline-1 outline-gray-700 py-2 px-4 rounded-lg transition-all .5s`}>
          Doctor's Consultation
        </p>
        <p onClick={() => TokenCheckHandler("/diagnosis")} className={`${pathname == '/diagnosis' && "outline outline-1 outline-white"} hover:outline text-white cursor-pointer outline-1 outline-gray-700 py-2 px-4 rounded-lg transition-all .5s`}>
          Diagnosis
        </p>
        <p onClick={() => TokenCheckHandler("/medication")} className={`${pathname == '/medication' && "outline outline-1 outline-white"} hover:outline cursor-pointer text-white outline-1 outline-gray-700 py-2 px-4 rounded-lg transition-all .5s`}>
          Medication Reminder
        </p>
        <p onClick={() => TokenCheckHandler("/nutrition")} className={`${pathname == '/nutrition' && "outline outline-1 outline-white"} hover:outline cursor-pointer text-white outline-1 outline-gray-700 py-2 px-4 rounded-lg transition-all .5s`}>
          Nutrition Checker
        </p>
      </div>
      <div className='flex cursor-pointer items-center space-x-8'>
          <div className='flex space-x-8 items-center'>
            {landing && !signedIn && 
              <Link href={"/choose_profession"}><Button className="rounded-full bg-[#40a1ce]">For Professionals</Button></Link>
            }
            {!signedIn ?
            <Link href={"/login"}><Button className="rounded-full bg-[#1f939b]">Sign In</Button></Link> 
            :
            <>
            <div className='flex items-center space-x-5'>
              <div className='text-xl'>
                <BsFillBellFill />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className='focus:outline-none outline-none border-none'>
                  <div className='flex space-x-2 focus:outline-none outline-none border-none'>
                    <p className='text-white'>Menu</p>
                    <AiOutlineMenu className='text-2xl text-white' />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-white mr-8 z-50'>
                  <DropdownMenuItem className='p-2 my-4 text-white cursor-pointer'><Link className='text-black hover:outline hover:outline-2 p-2 outline-gray-500' href={`/dashboard/${token.id}/upcoming`}>My DashBoard</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='p-2 text-white my-4 cursor-pointer'><Button onClick={signOutHandler} variant="outline" className="h-8 font-normal text-black -ml-2 text-md outline-none border-none">Sign Out</Button></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
          }
          </div>
      </div>
    </div>
    </>
  )
}



"use client"
import Hero from "@/components/Hero";
import Messages from "@/components/Messages";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function page() {
  const [messages, setMessages] = useState([])
  const [messageContent, setMessageContent] = useState("")
  const id = Math.ceil(Math.random() * 100000000)
  const url = `https://api.openai.com/v1/completions`
  async function handleSubmit(e) {
      const newMessage = { id, content: messageContent, owner: "owner" };
      setMessageContent("");
      setMessages(prevMessages => [...prevMessages, newMessage])
      const response = await fetch(url, {
        method : "POST",
        headers : {
          Authorization : `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
          'content-type' : 'application/json' 
        },
        body : JSON.stringify({
          model : "text-davinci-003",
          prompt : `${messageContent}`,
          max_tokens : 500
        })        
      })
      
      if (response.ok) {
        let answer = await response.json()
        answer = answer["choices"][0]["text"]
        setMessages(prevMessages => [...prevMessages, {id, content: answer, owner: "ai"} ])
      } else {
        console.error("Failed to send message");
      }
}

  
  return (
    <main className="min-h-screen flex flex-col w-full bg-contain bg-gradient-to-r from-[#40a1ce] to-[#bfecfa]">
      <nav className="bg-white"> 
        <Hero />
      </nav>
      <h1 className="my-4 mt-8 text-xl text-center tracking-wide">Use Our AI Consultation Service To Get Answers to Your Health-Related Questions </h1>
      <div className="w-full h-full flex items-center justify-center my-4">
        <div className="w-[58rem] mx-4 min-h-[90%] rounded-xl bg-gradient-to-r from-[#5c324e] to-[#3d135f]">
          <Messages chatbot={false} messages={messages}/>
          <div className="flex w-full justify-center items-center space-x-4 my-4 px-4">
            <input type="text" value={messageContent} onChange={e => setMessageContent(e.target.value)} placeholder="Enter Your Message Here" className="h-[3rem] z-10 overflow-wrap px-4 w-[80%] focus:outline-none bg-transparent text-white text-xl placeholder:text-gray-400 border border-white rounded-full" />
            <div className="flex space-x-3 items-center text-5xl">
              <Button onClick={handleSubmit} className="rounded-full bg-[#118a8a]">Send</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


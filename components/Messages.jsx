"use client"
import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'

export default function Messages({ messages }) {
  const chatBoxRef = useRef(null);
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className='px-4 h-[33rem] overflow-y-scroll scrollbar-hide' ref={chatBoxRef}>
      {
        messages.map(message => <Message sender={message?.owner} messageContent={message?.content} key={message?.id} />)
      }
    </div>
  )
}

"use client"

import React, { useState } from 'react'

const Home = () => {

  const [message, setMessage] =useState('');
  const [response, setResponse] =useState('');
  const [loading, setLoading] =useState(false);
  const [streams, setStreams] =useState([]);
  const [error, setError] = React.useState(null);



  const handleChat = async()=>{
    setLoading(true);
    setResponse("")
    try {
    

      const res = await fetch('/api/chat',{
        method:"PORT",
        headers:"application/json",
        body:JSON.stringify({message})
      })

      const data = res.json();
      setResponse(data?.response)
      
    } catch (error) {
      setResponse("Error", + error.message)
    }

    setLoading(false)
  }

  return (
    <div className='flex items-center justify-center h-screen w-full '>
      <button className='p-4 rounded-xl bg-gradient-to-r from-indigo-600 via-pink-400 to-purple-500'>Start!</button>
    </div>
  )
}

export default Home

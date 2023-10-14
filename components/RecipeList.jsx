"use client"
import React, { useEffect, useState } from 'react'
import RecipeCard from './RecipeCard'

export default function RecipeList() {
    const [data, setData] = useState(null)
    useEffect(() => {
     const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
     let token = localStorage.getItem("token")
     token = JSON.parse(token)
     fetch(`${endpoint}/recipes`, {
       method: 'GET',
       headers : {'Content-Type': 'application/json',
       'Authorization': 'bearer ' + token.access_token }
     })
       .then((res) => res.json())
       .then((data) => {
         setData(data)
         console.log(data)
       })
   }, [])
  return (
    <div className='grid grid-cols-4 gap-4 m-8 '>
      {
        data && data.detail != 'empty' && data.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe}/>)
      }
    </div>
  )
}

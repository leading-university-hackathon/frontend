import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function RecipeCard({ recipe }) {

    async function handleDelete(e) {
        e.preventDefault()
        const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
        const token = localStorage.getItem('token')
        const Token = JSON.parse(token)
        const response = await fetch(`${endpoint}/recipes/delete/${recipe.id}`, {
          method: 'DELETE',
          headers : {'Content-Type': 'application/json',
          'Authorization' : `bearer ${Token.access_token}`
        },
        })
        setTimeout(() => {
            window.location.reload()
          }, 100)
    }

  return (
    <div className='border border-gray-300 rounded-lg'>
    <div className="relative w-full h-64 rounded-md overflow-hidden">
        <Image src={recipe.url} layout="fill" objectFit="cover" alt="Image" />
    </div>
      <h1 className='text-lg my-1 px-4 font-semibold'>{recipe.name}</h1>
      <h1 className=' font-light px-4 my-2'>{recipe.description}</h1>
      <div className='space-x-6 flex items-center px-4 py-4'>
          <Link href={`/dashboard/update/${recipe.id}`} className='px-4 mb-4 py-2 rounded-lg text-white bg-[#205982]'>Update Recipe</Link>
          <Link href={`/dashboard`} onClick={handleDelete} className='px-4 mb-4 py-2 rounded-lg text-white bg-[#dd2f2f]'>Delete Recipe</Link>
      </div>
    </div>
  )
}

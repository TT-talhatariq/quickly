import React from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'

const UnauthorizedPage = () => {
  return (
    <div>
      <Navbar />

      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-6xl font-bold mb-8'>401 - Unauthorized</h1>
        <p className='text-xl mb-4'>
          Oops! You are not authorized to access this page.
        </p>
        <Link href='/'>
          <button className='text-blue-500 hover:underline'>
            Go back to home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default UnauthorizedPage

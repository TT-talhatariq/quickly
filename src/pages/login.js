import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import { login } from './api/Api'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault()

    if (validateForm()) {
      setError('')
      setIsLoading(true)

      console.log('email', email)
      console.log('password', password)
      try {
        const userData = { email, password }
        console.log(userData)
        const response = await login(userData)

        // extract token from response and save it into local storage
        const { token } = response
        localStorage.setItem('jwttoken', token)
        // Redirect the user to the profile page
        router.push('/Profile')
      } catch (error) {
        console.error('Login error:', error)
        setError('Invalid email address or password')
      }

      setIsLoading(false)
    } else {
      setError('Invalid email address or password')
    }
  }

  function validateForm() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const minLength = 6

    if (!email || !emailRegex.test(email)) {
      return false
    }

    if (!password || password.length < minLength) {
      return false
    }

    return true
  }

  return (
    <div>
      <Navbar />
      <div className='flex justify-center items-center h-screen'>
        <form
          className='max-w-lg w-3/4 p-8 bg-white rounded shadow-md'
          onSubmit={handleSubmit}
        >
          {error && <div className='text-red-500 mb-6'>{error}</div>}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              autoFocus
              type='email'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='w-full py-2 px-4 bg-[#ff6661] hover:bg-[#ff6661]/75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white rounded-md'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

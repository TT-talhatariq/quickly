import React, { useState } from 'react'
import { signup } from './api/Api'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'

const Signup = () => {
  const router = useRouter()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [submitForm, setSubmitForm] = useState(false)

  // validate email
  const validateEmail = (email) => {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return reg.test(email)
  }

  // handle password change
  const handlePasswordChange = (e) => {
    setSubmitForm(false)
    setPassword(e.target.value)
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setError('')
  }
  // handle confirm password change
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)

    if (password !== e.target.value) {
      setError('Password and Confirm Password do not match')
      return
    }
    setError('')
    setSubmitForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!submitForm) {
      return
    }

    // validate all fields are not empty
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !company
    ) {
      setError('All fields are required')
      return
    }

    // validate email
    if (!validateEmail(email)) {
      setError('Invalid email address')
      return
    }

    console.log(firstName, lastName, email, password, confirmPassword)

    // api calling
    try {
      const userData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        company: {
          name: company,
        },
      }
      const response = await signup(userData)
      console.log('Signup success:', response)
      setError('')
      // Redirect the user to the login page
      router.push('/Login')
      // Handle success, such as redirecting to a different page
    } catch (error) {
      console.error('Signup error:', error)
      setError(error.message)
      console.error('Signup error:', error)
      return
    }

    // Reset the form fields and error state
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setCompany('')
  }

  return (
    <div>
      <Navbar />
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='max-w-md w-full p-8 bg-white shadow-lg rounded-lg mt-20'>
          <h1 className='text-3xl font-bold text-center mb-6'>Signup</h1>
          {error && <p className='text-red-500 mb-4    text-center'>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='block text-gray-700'>First Name:</label>
              <input
                type='text'
                className='border border-gray-300 rounded-md p-2 w-full'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Last Name:</label>
              <input
                type='text'
                className='border border-gray-300 rounded-md p-2 w-full'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Email:</label>
              <input
                type='email'
                className='border border-gray-300 rounded-md p-2 w-full'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Password:</label>
              <input
                type='password'
                className='border border-gray-300 rounded-md p-2 w-full'
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Confirm Password:</label>
              <input
                type='password'
                className='border border-gray-300 rounded-md p-2 w-full'
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Company:</label>
              <input
                type='text'
                className='border border-gray-300 rounded-md p-2 w-full'
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <button
              type='submit'
              className='bg-[#ff6661] text-white rounded-md py-2 px-4 w-full'
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup

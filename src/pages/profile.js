import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getUser } from './api/Api'
import Navbar from '../../components/Navbar'

function Profile() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      // Check authentication state
      const jwtToken = localStorage.getItem('jwttoken')

      if (!jwtToken) {
        // User is not authenticated, redirect to 401 page or login page
        router.push('/401') // Assuming you have a 401 page component or a login page component
      } else {
        // User is authenticated, fetch user data or get it from local storage
        const userData = localStorage.getItem('userData')

        if (userData) {
          // If user data exists in local storage, parse and set it in state
          setUser(JSON.parse(userData))
        } else {
          const response = await getUser(jwtToken)
          setUser(response.user)
          localStorage.setItem('userData', JSON.stringify(response.user))
        }
      }
    }
    fetchData()
  }, [router])

  return (
    <div>
      <Navbar />
      <div className='flex justify-center items-center h-screen'>
        {user ? (
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div>
              <p>
                <strong>First Name:</strong> {user.first_name}
              </p>
              <p>
                <strong>Last Name:</strong> {user.last_name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              {/* Render other user information here */}
            </div>
          </div>
        ) : (
          <p>Loading...</p> // Display a loading state while fetching user data
        )}
      </div>
    </div>
  )
}

export default Profile

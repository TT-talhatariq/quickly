import axios from 'axios'

const API_BASE_URL = 'https://api-dev.quicklyinc.com'

// Signup API call
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Login API call
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// User API call
export const getUser = async (jwtToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

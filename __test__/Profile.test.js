import { render } from '@testing-library/react'
import React from 'react'
import Profile from '../src/pages/profile'
import axios from 'axios'
test('renders Profile component without errors', () => {
  render(<Profile />)
})

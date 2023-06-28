import { render } from '@testing-library/react'
import axios from 'axios'
import Signup from '../src/pages/signup'

test('renders Signup component without errors', () => {
  render(<Signup />)
})

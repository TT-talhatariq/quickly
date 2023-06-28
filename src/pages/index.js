import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '../../components/Navbar'
import Login from './login'
import Signup from './signup'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Navbar />
      <Login />
      {/* <Link href="/signup" passHref>
        <button className="bg-blue-500 text-white rounded-md py-2 px-4 mt-4">
          Signup
        </button>
      </Link> */}
    </>
  )
}

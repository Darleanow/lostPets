import Image from 'next/image'
import { Inter } from 'next/font/google'
import Authent from './authentification';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Authent/>
  )
}

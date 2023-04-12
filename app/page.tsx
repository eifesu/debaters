"use client"


import Image from 'next/image'
import { useEffect, useState } from 'react'
import { database } from '../util/firebase'
import { onValue, ref } from 'firebase/database'
import { useRouter } from 'next/navigation'


const Home = () => {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center animate-pulse justify-center gap-2 h-full w-full p-8">
      <Image src="terminal.svg" width={32} height={200} alt="Terminal logo" onClick={() => router.push('/auth')}/>
      <Image src="clob.svg" width={64} height={200} alt="Club logo" />
      
    </main>
  )
}

export default Home;
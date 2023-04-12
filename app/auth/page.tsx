'use client'

import Image from "next/image"
import Link from "next/link";
import {useState} from 'react'

const Auth = () => {
    const [username, setUsername] = useState('');

    function userNameHandler(e: React.ChangeEvent<HTMLInputElement>) {
      setUsername(e.target.value)
    }

    return (
    <main className="flex flex-col items-center justify-center gap-4 h-full w-full p-4">
      <Image src="terminal.svg" width={32} height={200} alt="Terminal logo" />
      <input type="text" placeholder='Pick your username' value={username} onChange={userNameHandler} className="w-full mt-4 bg-[#CFCFCF] h-12 p-4 box-border text-center font-black rounded-md" />
      {username.length > 3 ? 
      <Link href={{pathname: '/home', query: {username}}} className="w-full bg-[#2B57F5] h-12 text-center flex items-center justify-center text-white font-black rounded-md transition">Continue</Link>
      : <Link href={{pathname: '/auth'}}  className="w-full bg-[#2B57F5] h-12 text-center  flex items-center justify-center text-white font-black rounded-md opacity-50 transition">Continue</Link>     
    }
    </main>
    )

}

export default Auth;
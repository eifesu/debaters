'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { database, db } from '@/util/firebase'
import { onValue, ref, set } from 'firebase/database'
// @ts-nocheck
import { v4 as uuidv4 } from 'uuid';
import { collection, query, onSnapshot, where, addDoc, orderBy, } from 'firebase/firestore'
import { useRouter, useSearchParams } from 'next/navigation'

function Home() {
    const [messages, setMessages] = useState([] as { id: string, user: string, content: string, createdAt: number}[])
    const [message, setMessage] = useState('');
    const [votes, setVotes] = useState([] as { user: string, value: number, createdAt: number }[])
    const endRef = React.useRef(null) as any;

    const scrollToBottom = () => {
        // @ts-nocheck
        endRef.current?.scrollIntoView({ behavior: "smooth" })
      }

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setMessages([])
            const arr = [] as any[];
            querySnapshot.forEach((doc) => {
                arr.push(doc.data());
            });
            setMessages(arr)
            // @ts-nocheck
        });
        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(() => {
      scrollToBottom()
    }, [messages])
    
    useEffect(() => {
        const q = query(collection(db, "votes"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const arr = [] as any[];
            querySnapshot.forEach((doc) => {
                arr.push(doc.data());
            });
            console.log(arr);
            setVotes(arr)
        });
        return () => {
            unsubscribe()
        }
    }, [])

    async function send() {
        if(message.length == 0 || messages.some(message =>  message.user === user && (new Date().getTime() - message.createdAt) / 1000 < 3)) {
            window.alert("Please wait 3 secondds between messges");
            return 
        }
        else {const messageRef = await addDoc(collection(db, "messages"), {
            user,
            content: message,
            createdAt: new Date().getTime()
        
        });
        setMessage('')
    }
    }

    
    async function upVote() {
        if(votes.some(vote => vote.user === user && (new Date().getTime() - vote.createdAt) / 60000 < 1)) {
            window.alert("Please wait a little before voting again!");
            return 
        }
        else {        
            const vote = await addDoc(collection(db, "votes"), {
                user,
                value: 1,
                createdAt: new Date().getTime()
            });
        }    
    }
    
    async function downVote() {
        if(votes.some(vote => vote.user === user && (new Date().getTime() - vote.createdAt) / 60000 < 1)) {
            window.alert("Please wait a little before voting again!");
            return 
        }
        else {        
            const vote = await addDoc(collection(db, "votes"), {
                user,
                value: -1,
                createdAt: new Date().getTime()
            });
        }    

    }

    function Message(props: { user: string, content: string }) {

        return props.user !== user
            ? <div className=" w-full bg-[#FFC840] mt-2 rounded-md p-2 px-4 flex flex-col items-start justify-center transition">
                <h1 className='font-black text-[10px]'>@{props.user}</h1>
                <p className="text-[10px] text-start font-semibold max-w-md">{props.content}</p>
            </div>
            : <div className=" w-full bg-[#3864D6] text-white mt-2 rounded-md p-2 px-4 flex flex-col items-start justify-center transition">
                <h1 className='font-black text-[10px]'>You</h1>
                <p className="text-[10px] text-start font-semibold max-w-md">{props.content}</p>
            </div>
    }
    const searchParams = useSearchParams();
    const user = searchParams.get('username');
    const router = useRouter();
    if(!user) {
        router.push('/auth');
    }
    else return (
        <main className="flex flex-col items-center justify-center h-full max-h-full max-w-full p-4">
            {/* Logo */}
            <div className="w-full h-4 flex items-center justify-between animate-pulse">
                <h1 className='font-black text-[10px]'>Logged in as @{user}</h1>
                <Image src="terminal.svg" width={32} height={200} alt="Terminal logo" onClick={() => router.push('/auth')}/>
                
            </div>
            {/* Vote */}
            <div className="mb-8 text-center w-full">
                <h1 className="text-2xl font-black ">Vote !</h1>
                <h2 className="text-sm font-semibold">Agree or disagree with a team</h2>
                {/* Team A */}
                <div className="w-full rounded-md bg-[#D63838] h-16 relative mt-2 flex items-center justify-center text-white">
                    <button onClick={() => downVote()} className="w-1/4 h-full flex items-center justify-center absolute left-0 top-0 bg-[#8E2424] rounded-tl-md rounded-bl-md">
                        <Image src="frown.svg" width={32} height={200} alt="Disagree" />
                    </button>

                    <h1 className='text-xs font-semibold'>TEAM<h2 className="text-xl font-black">Winners</h2></h1>
                    <button onClick={() => upVote()} className="w-1/4 h-full flex items-center justify-center absolute right-0 top-0 bg-[#8E2424] rounded-tr-md rounded-br-md">
                        <Image src="clap.svg" width={32} height={200} alt="Disagree" />
                    </button>
                </div>

                {/* Team B */}
                <div className="w-full rounded-md bg-[#3864D6] h-16 relative mt-2 flex items-center justify-center text-white">
                    <button onClick={() => upVote()} className="w-1/4 h-full flex items-center justify-center absolute left-0 top-0 bg-[#244E8E] rounded-tl-md rounded-bl-md">
                        <Image src="frown.svg" width={32} height={200} alt="Disagree" />
                    </button>
                    <h1 className='text-xs font-semibold'>TEAM<h2 className="text-xl font-black">BRO DDC</h2></h1>
                    <button onClick={() => downVote()}  className="w-1/4 h-full flex items-center justify-center absolute right-0 top-0 bg-[#244E8E] rounded-tr-md rounded-br-md">
                        <Image src="clap.svg" width={32} height={200} alt="Disagree" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="mt-2 h-2 w-full rounded-full bg-[#3864D6] relative">
                    <Image src="caret.svg" className="absolute top-2" style={{ left:  'calc(' + (((votes.filter(vote => vote.value === 1).length + 1) / (votes.length)) * 100) + '% - 7px)' }} width={12} height={200} alt="Caret" />
                    <div className="h-full bg-[#D63838] rounded-tl-full rounded-bl-full transition-[3s]" 
                    style=
                    {{width: (((votes.filter(vote => vote.value === 1).length + 1) / (votes.length)) * 100) + '%' }}></div>
                </div>


            </div>
            {/* Chat */}
            <div className="flex-1 text-center w-full">
                <h1 className="text-2xl font-black ">Chat !</h1>
                <h2 className="text-sm font-semibold">Discuss the debate and the topic</h2>
                <div className="mt-2 h-[200px] flex flex-col overflow-y-auto" >
                    {messages && messages.map((message) => <Message key={message.id} user={message.user} content={message.content} />)}
                    <div className="h-2 w-full" ref={endRef} />
                </div>
            </div>
            <div className="w-full h-12 flex bg-[#CFCFCF] rounded-md gap-2 p-2 px-4">
                <input type="text" placeholder='Type a message' className="w-full bg-transparent h-full text-center font-black text-md" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button onClick={send} className='bg-[#aaaaaa] px-2 rounded-md'>
                    <Image src="plane.svg" className='text-gray-600' width={24} height={200} alt="Send" />
                </button>
            </div>
        </main>
    )
}

export default Home
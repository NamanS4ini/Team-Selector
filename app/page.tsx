import Link from 'next/link'
import React from 'react'
const page = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full bg-black text-white'>
      <h1 className='font-bold text-2xl text-center'>Welcome to Team Selector</h1>
      <p className='text-lg text-center mt-4'>This is a simple app to select teams for your games.</p>
      <p className='text-lg text-center mt-4'>Add the players and let the app do the hard work of selecting captains, teams and toss.</p>
      <p className='text-lg text-center mt-4'>Have fun!</p>
      <button className='mt-10 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition'>
        <Link href={"/selector"}>Start</Link>
      </button>
    </div>
  )
}

export default page
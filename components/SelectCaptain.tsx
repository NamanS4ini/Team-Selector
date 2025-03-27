"use client";
import React from 'react'
import RotatingText from './RotatingText';

const SelectCaptain = ({Players, setCaptains}: {Players:string[]; setCaptains: React.Dispatch<React.SetStateAction<string[]>>}) => {
    console.log(Players);
  return (<>
  <div className=' bg-black p-5'>
    <div className='text-3xl text-center mt-10 font-bold'>The Match is</div>
    <div className='flex mt-20 flex-col items-center justify-center h-full'>
      {/* Gives the Players array and seCaptains fxn to RotatingText */}
        <RotatingText Players={Players} setCaptains={setCaptains}/>
    </div>
  </div>
    {/* <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-px bg-white w-full'></div> */}
    
  </>
  )
}

export default SelectCaptain
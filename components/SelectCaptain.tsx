import React from 'react'

const SelectCaptain = ({Players}: {Players:string[]}) => {
    console.log(Players);
  return (<>
  <div className='min-h-[calc(100vh-48px)] bg-black'>
    <div className='flex flex-col items-center justify-center h-full'>
        

    </div>
  </div>
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-px bg-white w-full'></div>
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <img className='invert' src="/versus.png" alt="" />
    </div>
  </>
  )
}

export default SelectCaptain
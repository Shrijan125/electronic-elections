import React from 'react'

export interface submitbuttonInputProps {
    onClick: () => void,
    text: string
  }

const SubmitButton : React.FC<submitbuttonInputProps> = ({onClick, text}) => {
  return (
        <div className='bg-white p-[2px] mt-[6px] rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 sm:w-[300px]'>
            <button onClick={onClick}  className='bg-purple-700 text-white rounded-lg px-6 py-2 hover:cursor-pointer hover:bg-purple-800 transition-alll duration-150 w-full'>{text}</button>
        </div>
  )
}

export default SubmitButton
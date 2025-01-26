import Link from 'next/link'
import React from 'react'

export interface buttonInputProps {
    text: string,
    link: string
  }

const PrimaryButton : React.FC<buttonInputProps> = ({text, link}) => {
  return (
    <Link href={link}>
        <div className='bg-white p-[2px] mt-[6px] rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 sm:w-[300px]'>
            <button  className='bg-purple-700 text-white rounded-lg px-6 py-2 hover:cursor-pointer hover:bg-purple-800 transition-alll duration-150 w-full'>{text}</button>
        </div>
    </Link>
  )
}

export default PrimaryButton
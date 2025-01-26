import PrimaryButton, { buttonInputProps } from '@/components/primary_button'
import React from 'react' 


const page = () => {
  const buttons : buttonInputProps[] = [
    {
      text : 'Register Voter',
      link : '/register'
    },
    {
      text : 'Cast Vote',
      link : '/vote'
    },
    {
      text : 'Tally Votes',
      link : '/tally'
    },
    {
      text: 'Authorise Voter',
      link: '/authorise'
    }
  ];
  return (
    <div className='flex items-center flex-col gap-14'>
    <h1 className='text-purple-200 font-extrabold text-center mt-16 text-4xl'>Welcome to Electronic-Elections!</h1>
    <div className='flex gap-4 flex-col'>
      {
        buttons.map((button, index) => (
          <PrimaryButton key={index} text={button.text} link={button.link} />
        ))
      }
    </div>
    </div>
  )
}

export default page
'use client';
import PrimaryInput from '@/components/primary_input'
import SubmitButton from '@/components/submit_button'
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';

const RegisterUser = () => {
    const [name, setName] = useState('');
    async function registerVoter() {
        if(!name || name === '' || name.trim() === '')
        {
            toast.error('Full Name is reuqired',{position : 'top-right'});
            return;
        }

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/registervoter`, {  fullName : name });
            toast.success('Voter registered successfully',{position : 'top-right'});
        } catch (error) {
            toast.error('Failed to register voter',{position : 'top-right'});
        }
    };
   
  return (
    <div className='flex flex-col items-center gap-4 mt-16'>
      <h1 className='text-purple-200 font-extrabold text-center text-4xl mb-11'>Register your Voter!</h1>
      <PrimaryInput setChange={setName} labeltext={'Enter Voter\'s name'} value={name}></PrimaryInput>
      <SubmitButton text='Submit' onClick={registerVoter}></SubmitButton>
    </div>
  )
}

export default RegisterUser
'use client';
import PrimaryInput from '@/components/primary_input';
import SubmitButton from '@/components/submit_button';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const AuthoriseVoter = () => {
    const [name, setName] = useState('');
    const router = useRouter();
    async function registerVoter() {
        if(!name || name === '' || name.trim() === '')
        {
            toast.error('Full Name is reuqired',{position : 'top-right'});
            return;
        }

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/authorisevoter`, {  fullName : name });
            toast.success('Voter authorised successfully',{position : 'top-right'});
        } catch (error) {
            toast.error('Failed to authorise voter',{position : 'top-right'});
        }
    };
  

    const session = useSession();
    if(!session || !session.data?.user)
    {
        router.replace('/login');
        return null;
    }
    
  return (
    <div className='flex flex-col items-center gap-4 mt-16'>
      <h1 className='text-purple-200 font-extrabold text-center text-4xl mb-11'>Register your Voter!</h1>
      <PrimaryInput setChange={setName} labeltext={'Enter Voter\'s name'} value={name} placeholder='John D'></PrimaryInput>
      <SubmitButton text='Authorise' onClick={registerVoter}></SubmitButton>
    </div>
  )
}

export default AuthoriseVoter
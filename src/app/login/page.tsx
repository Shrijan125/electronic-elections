'use client';
import PrimaryInput from '@/components/primary_input'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const LoginAuthority = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const handleClick = async () => {
        if (!id || id.trim() === '') {
            toast.error('ID is required', { position: 'top-right' });
            return;
        }
        if (!password || password.trim() === '') {
            toast.error('Password is required', { position: 'top-right' });
            return;
        }
    
        const response = await signIn('credentials', {
            email: id,
            password: password,
            redirect: false,
        });
    
        if (response?.error) {
            toast.error('Invalid credentials!', { position: 'top-right' });
        } else if (response?.ok) {
            toast.success('Login successful!', { position: 'top-right' });
            router.replace('/authorise');
        }
    };
   
  return (
    <div className='flex items-center flex-col gap-14'>
    <h1 className='text-purple-200 font-extrabold text-center mt-16 text-4xl'>Login using your credentials!</h1>
    <div className='flex gap-4 flex-col'>
    <PrimaryInput placeholder='AdminID' labeltext='Enter your ID' setChange={setId} value={id}></PrimaryInput>
    <PrimaryInput placeholder='Password' labeltext='Enter your Password' setChange={setPassword} value={password}></PrimaryInput>
    <div className='bg-white p-[2px] mt-[6px] rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 sm:w-[300px]'>
            <button onClick={handleClick} className='bg-purple-700 text-white rounded-lg px-6 py-2 hover:cursor-pointer hover:bg-purple-800 transition-alll duration-150 w-full'>Login</button>
        </div>
    </div>
    </div>
  )
}

export default LoginAuthority
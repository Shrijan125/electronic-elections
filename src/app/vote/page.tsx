'use client';
import PrimaryInput from '@/components/primary_input';
import SubmitButton from '@/components/submit_button';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const CastVote = () => {
    const [name, setName] = useState('');
    async function Vote({ vote }: { vote: string }) {
      if (!name || name.trim() === '') {
        toast.error('Full Name is required', { position: 'top-right' });
        return;
      }
    
      try {
        const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/castvote`, { 
          fullName: name, 
          vote: vote 
        });
    
        if (status === 200) {
          toast.success('Vote casted successfully!', { position: 'top-right' });
        } else {
          toast.error(data.message || 'Failed to cast your vote', { position: 'top-right' });
        }
      } catch (error: any) {
        if (error.response) {
          const { status, data } = error.response;
    
          switch (status) {
            case 404:
              toast.error(data.message || 'Voter not found', { position: 'top-right' });
              break;
            case 403:
              toast.error(data.message || 'Voter not authorised', { position: 'top-right' });
              break;
            case 400:
              toast.error(data.message || 'Missing required fields', { position: 'top-right' });
              break;
            default:
              toast.error(data.message || 'Failed to cast your vote', { position: 'top-right' });
          }
        } else {
          toast.error('Network error. Please try again later.', { position: 'top-right' });
        }
      }
    }
    

   
  return (
    <div className='flex flex-col items-center gap-4 mt-16'>
      <h1 className='text-purple-200 font-extrabold text-center text-4xl mb-11'>Register your Voter!</h1>
      <PrimaryInput setChange={setName} labeltext={'Enter Voter\'s name'} value={name}></PrimaryInput>
      <SubmitButton text='Yes' onClick={()=>{ Vote({vote:'yes'}) }}></SubmitButton>
      <SubmitButton text='No' onClick={()=>{Vote({vote:'no'})}}></SubmitButton>
      <div ></div>
    </div>
  )
}

export default CastVote
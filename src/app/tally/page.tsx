'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TallyVote = () => {
  const [data, setData] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    const fetchVoteData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tallyvote');
        const { totalYesVotes, totalNoVotes } = response.data;

        const formattedData = [
          { name: 'Yes', count: totalYesVotes ?? 0 },
          { name: 'No', count: totalNoVotes ?? 0 },
        ];

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching vote tally:', error);
      }
    };

    fetchVoteData();
  }, []);

  return (
    <div className='flex flex-col items-center gap-4 mt-16'>
    <h1 className='text-purple-200 font-extrabold text-center text-4xl mb-11'>Tally your Votes!</h1>
    <div className="w-[700px] h-[600px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#6D11AF" activeBar={<Rectangle fill="#4e0089" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </div>
  );
};

export default TallyVote;

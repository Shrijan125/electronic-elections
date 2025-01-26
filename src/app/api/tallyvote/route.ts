import { Vote } from '@/db/models/votes.model';
import { connectToDB } from '@/db';
import { NextResponse } from 'next/server';
import { publicKey, privateKey } from '@/constants/keys';

export async function GET() {
  try {
    await connectToDB();

    const votes = await Vote.find();
    const encryptedVotes = votes.map((vote) => BigInt(vote.encryptedVote));

    const aggregatedVotes = encryptedVotes.reduce((sum, vote) => publicKey.addition(sum, vote), publicKey.encrypt(0n));


    const totalYesVotes = Number(privateKey.decrypt(aggregatedVotes));

    const totalVotes = votes.length;
    const totalNoVotes = totalVotes - totalYesVotes;

    return NextResponse.json(
      {
        totalVotes,
        totalYesVotes,
        totalNoVotes,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error tallying votes:', error);
    return NextResponse.json(
      { message: 'Failed to tally votes' },
      { status: 500 },
    );
  }
}

import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/db';
import { Vote } from '@/db/models/votes.model';
import { Voter } from '@/db/models/voter.model';
import { publicKey } from '@/constants/keys';


enum VoteOption {
    Yes = "yes",
    No = "no"
}

interface casteVoteBody {
    vote : VoteOption;
    fullName : string;
}

export async function POST(req : NextRequest) {
  try {
    await connectToDB();

    const body = (await req.json()) as casteVoteBody;
    
    const { vote, fullName } = body;

    if (!fullName || !vote) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 },
      );
    }


    const voter = await Voter.findOne({ fullName });

    if (!voter) {
      return NextResponse.json(
        { message: 'Voter not found' },
        { status: 404 },
      );
    }

    if (!voter.authorised) {
      return NextResponse.json(
        { message: 'Voter not authorised' },
        { status: 403 },
      );
    }

    if (voter.votereceipt) {
      return NextResponse.json(
        { message: 'Voter has already cast a vote' },
        { status: 403 },
      );
    }

    const encryptedVote = vote === 'yes' ? publicKey.encrypt(1n) : publicKey.encrypt(0n);

    const receiptToken = uuidv4();

    await Vote.create({
      encryptedVote: encryptedVote.toString(),
    });

    await Voter.updateOne({ fullName }, { votereceipt: receiptToken });

    return NextResponse.json(
      {
        message: 'Vote successfully cast',
      },
      { status: 200 },
    );


  } catch (error) {
    console.error('Error casting vote:', error);
    return NextResponse.json(
      { message: 'Failed to cast vote' },
      { status: 500 },
    );
  }
}
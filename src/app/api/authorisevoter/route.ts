import { connectToDB } from "@/db";
import { Voter } from "@/db/models/voter.model";
import { VoterInterface } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
      await connectToDB();
      const body = (await req.json()) as VoterInterface;    
      const { fullName } = body;
      if (!fullName) {
        return NextResponse.json(
          { message: 'Missing required fields' },
          { status: 400 },
        );
      }

    const voter = await Voter.findOne({ fullName });
      if (!voter)
        return NextResponse.json(
          { message: 'Voter not found' },
          { status: 500 },
    );

    await Voter.updateOne({ fullName }, { authorised: true });
    
    return NextResponse.json(
        { message: 'Voter authorised successfully' },
        { status: 201 },
      );
    } catch (error) {
      return NextResponse.json(
        { message: 'Failed to add Voter' },
        { status: 500 },
      );
    }
  }
  
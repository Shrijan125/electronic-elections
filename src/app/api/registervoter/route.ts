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

    const existingVoter = await Voter.findOne({ fullName });
    if (existingVoter) {
      return NextResponse.json(
        { message: 'Voter already exists' },
        { status: 400 },
      );
    }
  
    const newVoter = await Voter.create({fullName});
      if (!newVoter)
        return NextResponse.json(
          { message: 'Failed to add Voter' },
          { status: 500 },
        );
  
      return NextResponse.json(
        { message: 'Voter added successfully' },
        { status: 201 },
      );
    } catch (error) {
      return NextResponse.json(
        { message: 'Failed to add Voter' },
        { status: 500 },
      );
    }
  }
  
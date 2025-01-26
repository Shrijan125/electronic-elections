import { NextResponse } from "next/server";
import * as paillierBigint from 'paillier-bigint';

export async function GET() {
    try {
        const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(2048);

        return NextResponse.json(
            {
                publicKey: {
                    n: publicKey.n.toString(),
                    g: publicKey.g.toString()
                },
                privateKey: {
                    lambda: privateKey.lambda.toString(),
                    mu: privateKey.mu.toString()
                }
            },
            { status: 200 },
        );
    } catch (error) {
        console.error('Error generating keys:', error);
        return NextResponse.json(
            { message: 'Failed to generateRandomKeys' },
            { status: 500 },
        );
    }
}

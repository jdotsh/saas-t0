import { type NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest) {
  try {
    return NextResponse.json(
      {
        message: 'Hello from the NextJS API'
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': '*'
          // "Content-Type": "application/json",
        }
      }
    );
  } catch {
    return NextResponse.error();
  }
}

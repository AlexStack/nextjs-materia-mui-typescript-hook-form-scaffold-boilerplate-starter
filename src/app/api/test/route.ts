import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const reqData = Object.fromEntries(searchParams);
  return NextResponse.json({
    message: 'Test getApiResponse GET success!',
    method: 'GET',
    reqData,
  });
};

export const POST = async (req: Request) => {
  const reqData = await req.json();
  return NextResponse.json({
    message: 'Test postApiResponse POST success!',
    method: 'POST',
    reqData,
  });
};

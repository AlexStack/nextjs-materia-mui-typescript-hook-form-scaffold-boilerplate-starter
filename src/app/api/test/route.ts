import { NextResponse } from 'next/server';

// Test local NextJs API /api/test method GET with parameters
export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const reqData = Object.fromEntries(searchParams);
  return NextResponse.json({
    message: 'Test getApiResponse GET success!',
    method: 'GET',
    reqData,
  });
};

// Test local NextJs API /api/test method POST with variables
export const POST = async (req: Request) => {
  const reqData = await req.json();
  return NextResponse.json({
    message: 'Test postApiResponse POST success!',
    method: 'POST',
    reqData,
  });
};

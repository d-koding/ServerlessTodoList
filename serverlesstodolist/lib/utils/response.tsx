import { NextResponse } from 'next/server';

export function sendResponse(
  status: number,
  method: string,
  success?: boolean,
  message?: string,
  data?: any
): NextResponse {
  return NextResponse.json(
    { method, success, message, data },
    { status }
  );
}
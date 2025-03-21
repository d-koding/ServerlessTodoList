import { NextResponse } from 'next/server';

export function sendResponse(data: any) {
  return NextResponse.json({ success: true, data }, { status: 200 });
}

export function sendError(error: string, details?: string, status: number = 500) {
  return NextResponse.json({ error, details }, { status });
}
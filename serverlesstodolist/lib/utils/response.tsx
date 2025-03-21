import { NextResponse } from 'next/server';
import { Todo } from '@/lib/types/todo'; // Adjust path

export function sendResponse(data: Todo | Todo[] | null) {
  return NextResponse.json({ success: true, data }, { status: 200 });
}

export function sendError(message: string, error: string, status: number) {
  return NextResponse.json({ success: false, message, error }, { status });
}
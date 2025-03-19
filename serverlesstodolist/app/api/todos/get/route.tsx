import { NextRequest, NextResponse } from 'next/server';
import { sendResponse } from '@/lib/utils/response';
import { getTodos } from '@/lib/services/todoStore';

export async function GET(req: NextRequest) {
  try {
    return sendResponse(200, 'GET', true, undefined, getTodos());
  } catch (error) {
    return sendResponse(500, 'GET', false, 'Server error');
  }
}
import { NextRequest } from 'next/server';
import { sendResponse } from '@/lib/utils/response';
import { addTodo } from '@/lib/services/todoStore';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    const newTodo = addTodo(text);
    return sendResponse(200, 'POST', true, 'Todo created', newTodo);
  } catch (error) {
    return sendResponse(500, 'POST', false, 'Server error');
  }
}
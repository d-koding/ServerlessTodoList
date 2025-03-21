import { NextRequest } from 'next/server';
import { sendResponse, sendError } from '@/lib/utils/response';
import { addTodo } from '@/lib/services/todoStore';

export async function POST(req: NextRequest) {
    try {
      const { text } = await req.json();
      console.log('Received text:', text);
      const newTodo = addTodo(text);
      console.log('New todo:', newTodo);
      return sendResponse(newTodo);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return sendError('Failed to post todos', errorMessage, 500);
    }
  }
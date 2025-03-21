import { NextRequest } from 'next/server';
import { sendResponse, sendError } from '@/lib/utils/response';
import { updateTodo } from '@/lib/services/todoStore';

export async function PATCH(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop(); 
    if (!id) {
      return sendError('Bad Request', 'Missing ID parameter', 400);
    }

    const { text, completed } = await req.json();

    const updatedTodo = updateTodo(parseInt(id), { text, completed });
    if (!updatedTodo) {
      return sendError('Not found', `Todo with ID ${id} not found`, 404);
    }

    return sendResponse(updatedTodo);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return sendError('Failed to update todo', errorMessage, 500);
  }
}

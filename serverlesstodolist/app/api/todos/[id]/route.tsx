import { NextRequest } from 'next/server';
import { sendResponse, sendError } from '@/lib/utils/response';
import { updateTodo } from '@/lib/services/todoStore';

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } } 
) {
  try {
    const { id } = context.params;
    const { text, completed } = await req.json();

    const todoId = parseInt(id);
    if (isNaN(todoId)) {
      return sendError('Invalid input', 'ID must be a valid number', 400);
    }

    const updatedTodo = updateTodo(todoId, { text, completed });
    if (!updatedTodo) {
      return sendError('Not found', `Todo with ID ${id} not found`, 404);
    }

    return sendResponse(updatedTodo);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return sendError('Failed to update todo', errorMessage, 500);
  }
}
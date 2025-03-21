import { NextRequest } from 'next/server';
import { sendResponse, sendError } from '@/lib/utils/response';
import { removeTodo } from '@/lib/services/todoStore';

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return sendError('Invalid input', 'ID must be a valid number', 400);
    }

    const todoId = parseInt(id);
    await removeTodo(todoId);

    return sendResponse(null);
  } catch (error) {
    console.error('Error in DELETE /api/todos/delete:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return sendError('Failed to delete todo', errorMessage, 500);
  }
}
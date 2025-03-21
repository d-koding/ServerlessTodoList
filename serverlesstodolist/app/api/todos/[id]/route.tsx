import { NextRequest } from 'next/server';
import { sendResponse } from '@/lib/utils/response';
import { updateTodo } from '@/lib/services/todoStore';
import { sendError } from '@/lib/utils/response';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
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
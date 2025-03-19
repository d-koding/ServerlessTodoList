import { NextRequest } from 'next/server';
import { sendResponse } from '@/lib/utils/response';
import { updateTodo } from '@/lib/services/todoStore';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const { text, completed } = await req.json();

    if (isNaN(parseInt(id))) {
      return sendResponse(400, 'PATCH', false, 'Invalid ID format');
    }

    const updatedTodo = updateTodo(parseInt(id), { text, completed });
    if (!updatedTodo) {
      return sendResponse(404, 'PATCH', false, 'Todo not found');
    }

    return sendResponse(200, 'PATCH', true, 'Todo updated', updatedTodo);
  } catch (error) {
    return sendResponse(500, 'PATCH', false, 'Server error');
  }
}
import { NextRequest } from 'next/server';
import { sendResponse, sendError } from '@/lib/utils/response';
import { removeTodo } from '@/lib/services/todoStore';

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id || isNaN(parseInt(id))) {
      return sendError('400');
    }
    removeTodo(parseInt(id));
    return sendResponse(200);
  } catch (error) {
    console.error('Error in DELETE /api/todos/delete:', error);
    return sendError('500');
  }
}
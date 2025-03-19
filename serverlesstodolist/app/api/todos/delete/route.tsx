import { NextRequest } from 'next/server';
import { sendResponse } from '@/lib/utils/response';
import { removeTodo } from '@/lib/services/todoStore';

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id || isNaN(parseInt(id))) {
      return sendResponse(400, 'DELETE', false, 'Invalid or missing ID');
    }
    removeTodo(parseInt(id));
    return sendResponse(200, 'DELETE', true, 'Todo deleted');
  } catch (error) {
    return sendResponse(500, 'DELETE', false, 'Server error');
  }
}
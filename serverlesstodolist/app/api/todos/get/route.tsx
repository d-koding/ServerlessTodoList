import { sendResponse, sendError } from '@/lib/utils/response';
import { getTodos } from '@/lib/services/todoStore';

export async function GET() {
  try {
    const todos = await getTodos();
    return sendResponse(todos);

  } catch (error: unknown) {

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return sendError('Failed to fetch todos', errorMessage, 500);
  }
}
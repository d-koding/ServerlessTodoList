import { Dispatch, SetStateAction } from 'react';
import type { Todo } from '@/lib/types/todo';

export async function fetchTodos(setTodos: Dispatch<SetStateAction<Todo[]>>) {
  const res = await fetch('/api/todos');
  const data = await res.json();
  setTodos(data.data || []);
}
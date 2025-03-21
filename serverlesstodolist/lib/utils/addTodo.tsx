import { Dispatch, SetStateAction } from 'react';
import type { Todo } from '@/lib/types/todo';

export async function addTodo(
  text: string,
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setText: Dispatch<SetStateAction<string>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  if (!text.trim()) return;

  setLoading(true);

  const res = await fetch('/api/todos/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  const data = await res.json();
  console.log('Response:', data);
  
  if (data.success) {
    setTodos((prevTodos) => [...prevTodos, data.data]);
    setText('');
  } else {
    console.error('Failed to add todo:', data);
  }

  setLoading(false);
}
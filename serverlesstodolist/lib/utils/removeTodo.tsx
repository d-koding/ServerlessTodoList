'use client';
import { Dispatch, SetStateAction } from 'react';
import type { Todo } from '@/lib/types/todo';

export async function removeTodo(
  id: number,
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  setLoading(true);
  try {
    const res = await fetch(`/api/todos/delete?id=${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'Failed to delete todo');
    }
    const data = await res.json();
    if (data.success) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}
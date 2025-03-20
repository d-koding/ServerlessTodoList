'use client';
import { useEffect, useState } from 'react';
import type { Todo } from '@/lib/types/todo';
import { fetchTodos } from '@/lib/utils/fetchTodos';
import { addTodo } from '@/lib/utils/addTodo';
import { removeTodo } from '@/lib/utils/removeTodo';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos(setTodos);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dylan's Serverless Todo List</h1>
      {loading && <p className="text-gray-500">Loading...</p>}
      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
          className="input input-bordered w-full max-w-xs"
          placeholder="Add a todo"
        />
        <button
          onClick={() => addTodo(text, setTodos, setText, setLoading)}
          disabled={loading}
          className="btn btn-primary">
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center p-2 bg-base-200 rounded">
            <span>{todo.text}</span>
            <button
              onClick={() => removeTodo(todo.id, setTodos, setLoading)}
              disabled={loading}
              className="btn btn-error btn-sm">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
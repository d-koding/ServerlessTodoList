'use client';
import { useEffect, useState } from 'react';
import type { Todo } from '@/lib/types/todo';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('/api/todos');
      const data = await res.json();
      setTodos(data.data);
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return;

    const res = await fetch('/api/todos/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    if (data.success) setTodos([...todos, data.data]);
    setText('');
  };

  const removeTodo = async (id: number) => {
    const res = await fetch('/api/todos/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data.success) setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Complete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

import type { Todo } from '../types/todo';

let todos: Todo[] = [];

export function initializeTodos(initialTodos?: Todo[]) {
  if (initialTodos) {
    todos = initialTodos;
  }
}

export function getTodos(): Todo[] {
  return todos;
}

export function addTodo(text: string): Todo {
  const newTodo = { id: Date.now(), text, completed: false };
  todos.push(newTodo);
  return newTodo;
}

export function updateTodo(id: number, updates: Partial<Todo>): Todo | null {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) return null;
  todos[todoIndex] = { ...todos[todoIndex], ...updates };
  return todos[todoIndex];
}

export function removeTodo(id: number): void {
  todos = todos.filter((todo) => todo.id !== id);
}
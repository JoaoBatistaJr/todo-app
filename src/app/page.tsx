'use client';

import { useState, useEffect } from 'react';
import TodoForm from '../../components/TodoForm';
import TodoItem from '../../components/TodoItem';

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // carregar tarefas ao abrir a página
  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/todos');
      const data: Todo[] = await res.json();
      setTodos(data);
    };

    load();
  }, []);

  // adicionar tarefa
  const addTodo = async (text: string) => {
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    
    // recarregar tarefas
    const res = await fetch('/api/todos');
    setTodos(await res.json());
  };

  // marcar tarefa como concluída
  const toggleTodo = async (id: number) => {
    await fetch('/api/todos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    const res = await fetch('/api/todos');
    setTodos(await res.json());
  };

  // deletar tarefa
  const deleteTodo = async (id: number) => {
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    const res = await fetch('/api/todos');
    setTodos(await res.json());
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg bg-blue-400">
      <h1 className="text-xl text-black font-bold mb-4 text-center">
        Lista de Tarefas
      </h1>

      <TodoForm addTodo={addTodo} />

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

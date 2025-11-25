'use client';

import { useState, useEffect } from 'react';
import TodoForm from '../../components/TodoForm';
import TodoItem from '../../components/TodoItem';
import TodoFilters from '../../components/TodoFilters';

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "done" | "todo">("all");

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/todos');
      const data: Todo[] = await res.json();
      setTodos(data);
    };
    load();
  }, []);

  const reload = async () => {
    const res = await fetch('/api/todos');
    setTodos(await res.json());
  };

  const addTodo = async (text: string) => {
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    reload();
  };

  const toggleTodo = async (id: number) => {
    await fetch('/api/todos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    reload();
  };

  const editTodo = async (id: number, text: string) => {
    await fetch('/api/todos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, text }),
    });
    reload();
  };

  const deleteTodo = async (id: number) => {
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    reload();
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "done") return todo.done;
    if (filter === "todo") return !todo.done;
    return true;
  });

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-xl shadow-xl
                    bg-gray-900 border border-gray-800">

      <h1 className="text-2xl font-bold text-center text-gray-100 mb-6">
        Lista de Tarefas
      </h1>

      <TodoFilters currentFilter={filter} setFilter={setFilter} />
      <TodoForm addTodo={addTodo} />

      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}

      {filteredTodos.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          Nenhuma tarefa encontrada.
        </p>
      )}

    </div>
  );
}

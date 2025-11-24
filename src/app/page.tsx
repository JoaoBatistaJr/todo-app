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
  const [filter, setFilter] = useState<"all" | "done" | "todo">("all");

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

  // editar tarefa
  const editTodo = async (id: number, text: string) => {
    await fetch('/api/todos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, text })
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

  // 🔍 aplica o filtro selecionado
  const filteredTodos = todos.filter(todo => {
    if (filter === "done") return todo.done;
    if (filter === "todo") return !todo.done;
    return true;
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg bg-blue-400">
      <h1 className="text-xl text-black font-bold mb-4 text-center">
        Lista de Tarefas
      </h1>

      {/* 🔵 Botões de filtro */}
      <div className="flex justify-center gap-3 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded font-bold ${
            filter === "all" ? "bg-white text-black" : "bg-gray-300 text-black"
          }`}
        >
          Todas
        </button>

        <button
          onClick={() => setFilter("todo")}
          className={`px-3 py-1 rounded font-bold ${
            filter === "todo" ? "bg-white text-black" : "bg-gray-300 text-black"
          }`}
        >
          Ativas
        </button>

        <button
          onClick={() => setFilter("done")}
          className={`px-3 py-1 rounded font-bold ${
            filter === "done" ? "bg-white text-black" : "bg-gray-300 text-black"
          }`}
        >
          Concluídas
        </button>
      </div>

      <TodoForm addTodo={addTodo} />

      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
}

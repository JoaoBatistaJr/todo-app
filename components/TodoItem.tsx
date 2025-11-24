'use client';

import { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodoItemProps = {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;
};

export default function TodoItem({
  todo,
  toggleTodo,
  deleteTodo,
  editTodo
}: TodoItemProps) {

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(todo.text);

  const handleSave = () => {
    if (value.trim() === '' || value === todo.text) {
      setIsEditing(false);
      return;
    }

    editTodo(todo.id, value);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center p-2 border-b">

      {isEditing ? (
        <input
          type="text"
          className="border px-2 py-1 rounded w-full mr-2"
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
      ) : (
        <span
          className={
            todo.done
              ? 'line-through text-gray-400 cursor-pointer'
              : 'cursor-pointer'
          }
          onClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => toggleTodo(todo.id)}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          ✔
        </button>

        <button
          onClick={() => deleteTodo(todo.id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          🗑
        </button>
      </div>
    </div>
  );
}

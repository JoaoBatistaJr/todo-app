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
    if (value.trim() !== '' && value !== todo.text) {
      editTodo(todo.id, value);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-2 
                    border border-gray-700 shadow">

      {isEditing ? (
        <input
          type="text"
          className="px-2 py-1 w-full mr-2 bg-gray-700 rounded text-gray-200 
                     border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
      ) : (
        <span
          className={`cursor-pointer text-gray-200 ${
            todo.done ? 'line-through text-gray-500' : ''
          }`}
          onClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => toggleTodo(todo.id)}
          className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
        >
          ✔
        </button>

        <button
          onClick={() => deleteTodo(todo.id)}
          className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow"
        >
          🗑
        </button>
      </div>
    </div>
  );
}

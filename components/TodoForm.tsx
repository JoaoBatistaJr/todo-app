'use client';

import { useState } from 'react';

type TodoFormProps = {
  addTodo: (text: string) => void;
};

export default function TodoForm({ addTodo }: TodoFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700
                   focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Nova tarefa..."
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold
                   transition-shadow shadow-md"
      >
        Adicionar
      </button>
    </form>
  );
}

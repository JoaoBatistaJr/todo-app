'use client';

import { useState } from 'react';

export default function TodoForm({ addTodo }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            addTodo(text);
            setText('');
        }
    };

    return(
        <form onSubmit={handleSubmit} className='flex mb-4'>
            <input
                type='text'
                value={text}
                onChange={(e) => setText(e.target.value)}
                className='border text-black p-2 flex-1 rounded'
                placeholder='Nova tarefa...'
                />
            <button className='bg-blue-500 text-white p-2 ml-2 rounded'> Adicionar</button>
        </form>
    );
}
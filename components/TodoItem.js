'use client';

export default function TodoItem({todo, toggleTodo, deleteTodo}) {
    return (
        <div className="flex justify-between items-center p-2 border-b">
            <span className={todo.done ? 'line-through text-gray-400' : ''}>{todo.text}</span>
            <div>
                <button
                    onClick={() => toggleTodo(todo.id)}
                    className="mr-2 bg-green-500 text-white px-2 py-1 rounded">✔
                </button>
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded">🗑
                </button>
            </div>
        </div>
    );
}
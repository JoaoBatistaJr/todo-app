'use client';

type Props = {
  currentFilter: 'all' | 'done' | 'todo';
  setFilter: (filter: 'all' | 'done' | 'todo') => void;
};

export default function TodoFilters({ currentFilter, setFilter }: Props) {
  return (
    <div className="flex justify-center gap-3 mb-4">

      <button
        className={`px-3 py-1 rounded ${
          currentFilter === 'all'
            ? 'bg-blue-700 text-white'
            : 'bg-gray-200 text-black'
        }`}
        onClick={() => setFilter('all')}
      >
        Todas
      </button>

      <button
        className={`px-3 py-1 rounded ${
          currentFilter === 'done'
            ? 'bg-blue-700 text-white'
            : 'bg-gray-200 text-black'
        }`}
        onClick={() => setFilter('done')}
      >
        Concluídas
      </button>

      <button
        className={`px-3 py-1 rounded ${
          currentFilter === 'todo'
            ? 'bg-blue-700 text-white'
            : 'bg-gray-200 text-black'
        }`}
        onClick={() => setFilter('todo')}
      >
        Pendentes
      </button>

    </div>
  );
}

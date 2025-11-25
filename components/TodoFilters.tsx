'use client';

type Props = {
  currentFilter: 'all' | 'done' | 'todo';
  setFilter: (filter: 'all' | 'done' | 'todo') => void;
};

export default function TodoFilters({ currentFilter, setFilter }: Props) {
  const base =
    "px-4 py-2 rounded-lg font-medium transition border shadow";

  const active =
    "bg-blue-600 text-white border-blue-700 shadow-lg";

  const inactive =
    "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700";

  return (
    <div className="flex justify-center gap-3 mb-6">

      <button
        className={`${base} ${currentFilter === 'all' ? active : inactive}`}
        onClick={() => setFilter('all')}
      >
        Todas
      </button>

      <button
        className={`${base} ${currentFilter === 'todo' ? active : inactive}`}
        onClick={() => setFilter('todo')}
      >
        Pendentes
      </button>

      <button
        className={`${base} ${currentFilter === 'done' ? active : inactive}`}
        onClick={() => setFilter('done')}
      >
        Concluídas
      </button>

    </div>
  );
}

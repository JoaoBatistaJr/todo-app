import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'todos.json');

export async function GET() {
  const data = await fs.readFile(filePath, 'utf8');
  return new Response(data, { status: 200 });
}

export async function POST(req) {
  const { text } = await req.json();
  const data = JSON.parse(await fs.readFile(filePath, 'utf8'));

  const newTodo = {
    id: Date.now(),
    text,
    done: false,
  };

  data.push(newTodo);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));

  return new Response(JSON.stringify(newTodo), { status: 201 });
}

export async function PUT(req) {
  const { id } = await req.json();
  const data = JSON.parse(await fs.readFile(filePath, 'utf8'));

  const updated = data.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );

  await fs.writeFile(filePath, JSON.stringify(updated, null, 2));
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}

export async function DELETE(req) {
  const { id } = await req.json();

  const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
  const updated = data.filter((todo) => todo.id !== id);

  await fs.writeFile(filePath, JSON.stringify(updated, null, 2));
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}

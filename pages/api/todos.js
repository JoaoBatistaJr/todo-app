import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'todos.json');

export default function handler(req, res) {
  let todos = JSON.parse(fs.readFileSync(filePath));

  if (req.method === 'GET') {
    res.status(200).json(todos);
  } else if (req.method === 'POST') {
    const newTodo = { id: Date.now(), text: req.body.text, done: false };
    todos.push(newTodo);
    fs.writeFileSync(filePath, JSON.stringify(todos));
    res.status(201).json(newTodo);
  } else if (req.method === 'PUT') {
    const { id } = req.body;
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    fs.writeFileSync(filePath, JSON.stringify(todos));
    res.status(200).json(todos);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    todos = todos.filter(todo => todo.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(todos));
    res.status(200).json(todos);
  } else {
    res.status(405).end();
  }
}

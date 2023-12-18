import express from 'express';
import cors from 'cors';

import { todos } from './data';
import { SmallTodo } from './mappers';
import { faker } from '@faker-js/faker';
import { IEntity } from './types';

const app = express(); 
app.use(cors()); // 3000 - (access) -> 4000
app.use(express.json()); // for req.body [string -> json]

app.get('/api/todos', (req, res) => {
	const smallTodos = todos.map(SmallTodo);

	res.send(smallTodos);
});

app.get('/api/todos/:todoId', (req, res) => {
	const { todoId } = req.params;

	const todo = todos.find((todo) => todo.id === todoId);

	if (!todo) return res.status(404).send({ message: `Todo not Found with id = ${todoId}` });

	res.send(todo);
}); 

app.delete('/api/todos/:todoId', (req, res) => {
	const { todoId } = req.params;
	const todoIdx = todos.findIndex((todo) => todo.id === todoId);

	if (todoIdx === -1)
		return res.status(404).send({ message: `Todo not Found with id = ${todoId}` });

	const [deletedTodo] = todos.splice(todoIdx, 1);
	res.send(deletedTodo);
});

app.post('/api/todos', (req, res) => {
	const todo: IEntity.Todo = {
		id: faker.string.uuid(),
		completed: false,
		ownerIP: faker.internet.ip(),
		createdAt: faker.date.birthdate(),
		...req.body,
	};

	todos.push(todo);

	res.send(todo);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

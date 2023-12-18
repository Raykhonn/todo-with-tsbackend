import { IEntity } from './types';

export const SmallTodo = ({ id, title, completed }: IEntity.Todo): IEntity.SmallTodo => ({
	id,
	title,
	completed,
});

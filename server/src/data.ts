import { faker } from '@faker-js/faker';
import { IEntity } from './types';

export const todos: IEntity.Todo[] = new Array(10).fill(null).map(() => ({
	id: faker.string.uuid(),
	title: faker.person.jobTitle(),
	description: faker.commerce.productDescription(),
	completed: faker.datatype.boolean(),
	deadline: faker.number.int({ min: 4, max: 20 }),
	createdAt: faker.date.birthdate().toString(),
	ownerIP: faker.internet.ip(),
}));
 
import { Book } from './types';

export type CreateBookDto = Required<Omit<Book, '_id'>>
export type UpdateBookDto = Partial<CreateBookDto>

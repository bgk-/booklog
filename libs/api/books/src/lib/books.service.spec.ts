import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BookModel } from './books.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from '@booklog/shared/types';
import { Model, Query } from 'mongoose';
import { createMock } from '@golevelup/ts-jest';

// Implemented from examples in https://github.com/jmcdo29/testing-nestjs/
export const mockBook = ({
                          _id = 'test uuid',
                           title = 'Test',
                           author = 'Tester Testerson',
                           date = new Date(),
                           rating = 0,
                           notes = 'Testing notes',
                           isComplete = false
                         } = {}): Book => ({
  _id,
  title,
  author,
  date,
  rating,
  notes,
  isComplete
});

describe('BooksService', () => {
  let service: BooksService;
  let bookModel: Model<BookModel>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(BookModel.ModelName),
          useValue: {
            find: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            create: jest.fn().mockResolvedValue(mockBook()),
            deleteOne: jest.fn().mockResolvedValue(true),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    bookModel = module.get<Model<BookModel>>(getModelToken(BookModel.ModelName));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new book', async () => {
    const book = await service.create({
      title: 'Test',
      author: 'Tester Testerson',
      date: new Date(),
      rating: 0,
      notes: 'Testing notes',
      isComplete: false
    });
    expect(book).toBeDefined();
  });

  it('should update a book', async () => {
    jest.spyOn(bookModel, 'findByIdAndUpdate').mockReturnValueOnce(
      createMock<Query<BookModel, BookModel>>({
        exec: jest.fn().mockResolvedValueOnce({
          ...mockBook(),
          title: 'updated',
        }),
      }),
    );

    const update = await service.update('test uuid', {
      title: 'updated'
    });
    expect(update.title).toEqual('updated');
  });
});

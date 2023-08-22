import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { mockBook } from './books.service.spec';
import { Book } from '@booklog/shared/types';

describe('BooksController', () => {
  let controller: BooksController;
  const bookList = [
    mockBook({ title: 'Find by date' }),
    mockBook({ title: 'Find another' }),
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            findByDate: jest.fn().mockResolvedValue(bookList),
            create: jest
              .fn()
              .mockImplementation((book: Book) => Promise.resolve({ ...book })),
            update: jest
              .fn()
              .mockImplementation((_, book: Book) =>
                Promise.resolve({ ...book })
              ),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();
    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a book', () => {
    const book = mockBook();
    expect(controller.create(book)).resolves.toEqual(mockBook());
  });

  it('should update a book', () => {
    const book = mockBook({ title: 'updated' });
    expect(controller.update('test uuid', book)).resolves.toEqual(
      mockBook({ title: 'updated' })
    );
  });

  it('should get all books by date', () => {
    expect(controller.findByDate(new Date(), new Date())).resolves.toEqual(
      bookList
    );
  });
});

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BookDocument, BookModel } from './books.schema';
import { CreateBookDto, UpdateBookDto } from '@booklog/shared/types';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(BookModel.ModelName) private bookModel: Model<BookModel>
  ) {}

  async create(book: CreateBookDto): Promise<BookDocument> {
    return this.bookModel.create(book);
  }

  async findByDate(startDate: Date, endDate: Date): Promise<BookDocument[]> {
    return this.bookModel
      .find({
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .exec();
  }

  async unfinished(): Promise<BookDocument[]> {
    return this.bookModel
      .find({
        isCompleted: null,
      })
      .exec();
  }

  async update(id: string, book: UpdateBookDto): Promise<BookDocument | null> {
    return this.bookModel.findByIdAndUpdate(id, book).exec();
  }

  async delete(bookId: string): Promise<boolean> {
    const result = await this.bookModel.deleteOne({ _id: bookId }).exec();
    return result.deletedCount === 1;
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book, CreateBookDto, UpdateBookDto } from '@booklog/shared/types';
import { MongoErrorFilter, MongooseErrorFilter } from '@booklog/api/mongo';

@Controller('books')
@UseFilters(MongoErrorFilter, MongooseErrorFilter)
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.create(createBookDto);
  }

  @Post(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto
  ): Promise<Book | null> {
    return this.bookService.update(id, updateBookDto);
  }

  @Get()
  async findByDate(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date
  ): Promise<Book[]> {
    return this.bookService.findByDate(startDate, endDate);
  }

  @Get('unfinished')
  async unfinished(): Promise<Book[]> {
    return this.bookService.unfinished();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.bookService.delete(id);
  }
}

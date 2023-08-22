import { Book } from '@booklog/shared/types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class BookModel implements Omit<Book, '_id'> {
  static Name = 'Book';

  @Prop({ required: true, maxlength: 255 })
  title: string;

  @Prop({ required: true, maxlength: 100 })
  author: string;

  @Prop()
  notes: string;

  @Prop({ required: true })
  date: Date;

  @Prop()
  isComplete: boolean;

  @Prop({ min: 0, max: 5 })
  rating: number;
}

export type BookDocument = HydratedDocument<BookModel>
export const BookSchema = SchemaFactory.createForClass(BookModel);
BookSchema.index({ title: 1, author: 1 }, { unique: true })

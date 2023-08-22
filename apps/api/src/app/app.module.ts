import { Module } from '@nestjs/common';
import { BookModule } from '@booklog/api/books';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27027/booklog'),
    BookModule,
  ],
})
export class AppModule {}

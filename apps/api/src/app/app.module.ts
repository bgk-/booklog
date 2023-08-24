import { Module } from '@nestjs/common';
import { BookModule } from '@booklog/api/books';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

const mongoPort = process.env.MONGO_PORT || 27017;
const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoUri = `mongodb://${mongoHost}:${mongoPort}/booklog`;
console.log(`[mongodb] Connecting to ${mongoUri}`);

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(mongoUri),
    BookModule,
  ],
})
export class AppModule {}

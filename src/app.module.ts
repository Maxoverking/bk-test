import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { ImageUploadModule } from './image-upload/image-upload.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGO_DB_TEST),
    UsersModule,
    AuthModule,
    ImageUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor() {
  //   this.connectToDatabase();
  // }

  // private async connectToDatabase() {
  //   try {
  //     MongooseModule.forRootAsync({
  //       useFactory: async () => ({
  //         uri: process.env.MONGO_DB_TEST,
  //       }),
  //     });
  //     console.log('Connected to database');
  //   } catch (error) {
  //     console.error('Error connecting to database:', error);
  //   }
  // }
}

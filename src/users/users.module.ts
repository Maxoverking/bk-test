import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/users.schema';
import { PaginationPerPage } from '../pagination/pagination';
import { CustomException } from 'src/exception/exceptions';
import { AuthModule } from '../auth/auth.module';
import { TranslateService } from './translate.service';
import { ImageUploadService } from './image.upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, PaginationPerPage, CustomException, TranslateService, ImageUploadService]
})
export class UsersModule { }

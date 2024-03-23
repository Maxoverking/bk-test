import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/users.schema';
import { PaginationPerPage } from '../../pagination/pagination';
import { CustomException } from 'src/exception/exceptions';

@Module({
  imports: [MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, PaginationPerPage, CustomException]
})
export class UsersModule { }

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { PaginationPerPage, resUserPerPage } from '../../pagination/pagination';
import { CustomException } from 'src/exception/exceptions';
import { AuthUser } from 'src/auth/schema/auth.user.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private pagination: PaginationPerPage,
    private customException: CustomException,
    private readonly configService: ConfigService
  ) { }

  async findAll(query: Query): Promise<User[]> {
    const currentPage = this.pagination.getPage(Number(query.page), resUserPerPage);

    const userName = query.user ? { name: { $regex: `${query.user}`, $options: 'i' } } : {};

    const res = await this.userModel.find({ ...userName }).limit(resUserPerPage).skip(currentPage)
    return res;
  }

  async createUser(user: User, owner: AuthUser, translatedName: string): Promise<User> {
    const data = { ...user, name_en: translatedName, owner: owner._id }

    const existingUser = await this.userModel.findOne({ name: user.name });
    if (existingUser) {
      throw new ConflictException('User already exists')
    }

    const newUser = await this.userModel.create(data);
    return newUser;
  }

  async findUserById(id: string): Promise<User> {

    this.customException.badRequest(id)

    const res = await this.userModel.findById(id);
    if (!res) {
      throw new NotFoundException('User not Found');
    }
    return res;
  }

  async updateUserById(id: string, user: User): Promise<User> {
    this.customException.badRequest(id)

    const existingUser = await this.userModel.findById(id);
    if (!existingUser) {
      throw new NotFoundException('User not Found');
    }
    const res = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true
    });
    return res;
  }

  async deleteUserById(id: string): Promise<User> {
    this.customException.badRequest(id)

    const res = await this.userModel.findByIdAndDelete(id);
    if (!res) {
      throw new NotFoundException('User not Found');
    }
    return res;
  }
}



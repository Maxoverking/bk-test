import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {


  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>
  ) { }

  async findAll(query: Query): Promise<User[]> {

    const userName = query.user ? { name: { $regex: `${query.user}`, $options: 'i' } } : {};

    const res = await this.userModel.find({ ...userName })
    return res;
  }

  async createUser(user: User): Promise<User> {
    const existingUser = await this.userModel.findOne({ name: user.name });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const newUser = await this.userModel.create(user);
    return newUser;
  }

  async findUserById(id: string): Promise<User> {
    const res = await this.userModel.findById(id);
    if (!res) {
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  async updateUserById(id: string, user: User): Promise<User> {
    const existingUser = await this.userModel.findById(id);
    if (!existingUser) {
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    }

    const res = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true
    });

    if (!res) {
      throw new HttpException('User not Found', HttpStatus.BAD_REQUEST);
    }
    return res;
  }


  async deleteUserById(id: string): Promise<User> {
    const res = await this.userModel.findByIdAndDelete(id);
    if (!res) {
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    }
    return res;
  }
}



import { Controller, Body, Param, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schema/users.schema';
import { createUserDto } from './user.dto/create-user.dto';
import { UpdateUserDto } from './user.dto/update-user.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) { }

  @Get()
  async getAllUser(@Query() query: ExpressQuery): Promise<User[]> {
    return this.usersService.findAll(query)
  }

  @Post('new')
  async createUser(@Body() user: createUserDto): Promise<User> {

    return this.usersService.createUser(user)
  }
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.findUserById(id)
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<User> {
    return this.usersService.updateUserById(id, user)
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUserById(id)
  }
}

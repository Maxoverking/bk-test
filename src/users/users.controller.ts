import { Controller, Body, Param, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schema/users.schema';
import { createUserDto } from './user.dto/create-user.dto';
import { UpdateUserDto } from './user.dto/update-user.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) { }

  @Get()
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getAllUser(@Query() query: ExpressQuery): Promise<User[]> {
    return this.usersService.findAll(query)
  }

  @Post('new')
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async createUser(@Body() user: createUserDto): Promise<User> {

    return this.usersService.createUser(user)
  }
  @Get(':id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'User not Found' })
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.findUserById(id)
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'User not Found' })
  // @ApiResponse({ status: 400, description: 'Bad Request' })
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<User> {
    return this.usersService.updateUserById(id, user)
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The user has been successfully delete.' })
  @ApiResponse({ status: 404, description: 'User not Found' })
  async deleteUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUserById(id)
  }
}

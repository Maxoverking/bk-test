import { Controller, Body, Param, Delete, Get, Post, Put, Query, UseGuards, Req, UseInterceptors, UploadedFile, Request, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schema/users.schema';
import { CreateUserDto } from './userDto/create-user.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { TranslateService } from './translate.service';
import { AuthUser } from 'src/auth/schema/auth.user.schema';
import * as multer from 'multer';
import { ImageUploadService, ImageUploadedData } from './image.upload.service';

interface RequestData {
  data: string;
}

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private translateService: TranslateService,
    private imageUploadService: ImageUploadService,
  ) { }

  @Get()
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })

  async getAllUser(@Query() query: ExpressQuery): Promise<User[]> {
    return this.usersService.findAll(query)
  }

  @Post('new')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('image', {
    storage: multer.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024 }, // Ограничение размера до 1 мегабайт
  }))
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createUser(@Body() data: RequestData, @Req() owner: AuthUser, @UploadedFile() file: Express.Multer.File): Promise<User> {

    const jsonUserData = JSON.parse(data.data);
    let imageUrl: string | ImageUploadedData;

    if (file) {
      imageUrl = await this.imageUploadService.getImageUrl(file);
    }

    // console.log("🚀  imageUrl:", imageUrl);
    const userData = { ...jsonUserData, image_url: imageUrl ?? '' }
    return this.usersService.createUser(userData, owner)

  }


  @Get(':id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'User not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.findUserById(id)
  }

  // @Put(':id')
  // @ApiResponse({ status: 200, description: 'OK' })
  // @ApiResponse({ status: 404, description: 'User not Found' })
  // @ApiResponse({ status: 400, description: 'Bad Request' })
  // async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<User> {
  //   return this.usersService.updateUserById(id, user)
  // }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The user has been successfully delete.' })
  @ApiResponse({ status: 404, description: 'User not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async deleteUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUserById(id)
  }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', imageStorageConfig))
  // uploadFile(@UploadedFile() file, @Request() req): Observable<Object> {


  //   // console.log("🚀  file:", file);
  //   return of({ imagePath: file.filename });
  // }
}

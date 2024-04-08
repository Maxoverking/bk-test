import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as sharp from 'sharp';


@Controller('images')
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) { }


  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
    storage: multer.memoryStorage(),
    limits: { fileSize: 1 * 1024 * 1024 }, // Ограничение размера до 1 мегабайт
  }))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    try {
      const resizedImage = await sharp(file.buffer)
        .resize({
          width: 512,
          height: 512,
          fit: 'inside',
        })
        .toBuffer();

      const result = await this.imageUploadService.upload(resizedImage)
      console.log("🚀  result:", result);
      return result
    } catch (error) {
      console.error('uploadImage', error);
      throw new Error('not Upload file')
    }

  }


}

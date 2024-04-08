import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

export interface ImageUploadedData {
  url: string, secure_url: string, asset_id: string, public_id: string
}

@Injectable()
export class ImageUploadService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }

  async getImageUrl(file: Express.Multer.File): Promise<ImageUploadedData | string> {
    try {
      const resizedImage = await sharp(file.buffer)
        .resize({
          width: 1024,
          height: 1024,
          fit: 'inside',
        })
        .toBuffer();

      // const { url, secure_url, asset_id, public_id } = await this.upload(resizedImage);
      const imageData = await this.upload(resizedImage);
      // console.log("🚀  imageData:", imageData);
      if (!imageData) {
        return '';
      }
      const { url, secure_url, asset_id, public_id } = imageData;
      return { url, secure_url, asset_id, public_id };
    } catch (error) {
      console.error('uploadImage', error);
      throw new Error('not Upload file')
    }
  }



  async upload(fileData: Buffer): Promise<UploadApiErrorResponse | UploadApiResponse> {
    // Создать временный файл и записать в него данные из буфера
    const tempFilePath = '/tmp/tempImage'; // Путь к временному файлу
    fs.writeFileSync(tempFilePath, fileData);
    return new Promise((resolve, reject) => {
      v2.uploader.upload(tempFilePath, { folder: 'images-test' }, (error, result) => {

        fs.unlinkSync(tempFilePath);
        if (error) {
          return reject(error)
        }
        resolve(result);
      })
    })

  }
}

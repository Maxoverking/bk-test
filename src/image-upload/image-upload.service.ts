import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';


@Injectable()
export class ImageUploadService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
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

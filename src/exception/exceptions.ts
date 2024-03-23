import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';

export class CustomException {

  badRequest(id: string) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Something goes wrong');
    }
  }

};

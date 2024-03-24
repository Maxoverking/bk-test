import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';


export class CustomException {

  badRequest(id: string) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Something goes wrong');
    }
  }
  isEmaiExist(email: string, existEmail: string) {
    if (email === existEmail || existEmail === null) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  isEmaiNull(existEmail: { email: string, password: string } | null) {
    if (existEmail === null) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }
  isPaswordCorrect(isValidPassword: boolean) {

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

};

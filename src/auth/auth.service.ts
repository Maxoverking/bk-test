import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthUser } from './schema/auth.user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SingUpUserDto } from './dto/singUpUserDto-schema';
import { AuthRequest, Token } from './interfaces/token';
import { LoginUserDto } from './dto/loginUserDto-schema';
import { CustomException } from 'src/exception/exceptions';




@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthUser.name)
    private authUser: Model<AuthUser>,
    private jwtService: JwtService,
    private customException: CustomException,
  ) { }

  async singUp(singUpUserDto: SingUpUserDto): Promise<AuthRequest> {

    const { name, email, password } = singUpUserDto;

    const emailExist = await this.authUser.findOne({ email });

    if (emailExist !== null) {
      this.customException.isEmaiExist(emailExist.email, email);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.authUser.create({ name, email, password: hashedPassword });

    const token = this.jwtService.sign({ id: user._id })

    const res = { token, data: { email: user.email, name: user.name } }

    return res;

  }

  async login(loginUserDto: LoginUserDto): Promise<Token> {
    const { email, password } = loginUserDto;

    const emailExist = await this.authUser.findOne({ email });

    this.customException.isEmaiNull(emailExist);

    const isValidPassword = await bcrypt.compare(password, emailExist.password);

    this.customException.isPaswordCorrect(isValidPassword);

    const token = this.jwtService.sign({ id: emailExist._id })

    return { token };
  }
}

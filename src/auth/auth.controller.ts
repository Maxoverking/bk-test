import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SingUpUserDto } from './dto/singUpUserDto-schema';
import { Token } from './interfaces/token';
import { LoginUserDto } from './dto/loginUserDto-schema';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }



  @Post('/singup')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  singUp(@Body() singUpUserDto: SingUpUserDto): Promise<Token> {
    return this.authService.singUp(singUpUserDto)
  }


  @Get('/login')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'Invalid Unauthorized' })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  login(@Body() loginUserDto: LoginUserDto): Promise<Token> {
    return this.authService.login(loginUserDto)
  }

}

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";



export class LoginUserDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email not correct' })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;


};
import { ApiProperty } from "@nestjs/swagger";
import { USER_ROLE } from "../schema/users.schema";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  readonly age: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly logined: boolean;

  @ApiProperty({
    description: `User role: ADMIN, BOSS,USER`,
    minimum: 1,
    default: 'USER',
  })
  @IsNotEmpty()
  @IsEnum(USER_ROLE, { message: 'Add Role please' })
  readonly role: USER_ROLE;

};


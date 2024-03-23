import { ApiProperty } from "@nestjs/swagger";
import { USER_ROLE } from "../schema/users.schema";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly age: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly logined: boolean;

  @ApiProperty()
  @IsOptional()
  @IsEnum(USER_ROLE, { message: 'Add Role please' })
  readonly role: USER_ROLE;

};
import { ApiProperty } from "@nestjs/swagger";
import { USER_ROLE } from "../schema/users.schema";
import { IsBoolean, IsEmpty, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { AuthUser } from "src/auth/schema/auth.user.schema";

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly name: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly name_en: string;

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

  @IsEmpty({ message: "You can not pass User id" })
  readonly owner: AuthUser;

};
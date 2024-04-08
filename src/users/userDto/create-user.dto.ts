import { ApiProperty } from "@nestjs/swagger";
import { USER_ROLE } from "../schema/users.schema";
import { IsBoolean, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AuthUser } from "src/auth/schema/auth.user.schema";
import { ImageUploadedData } from "../image.upload.service";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  // @IsNotEmpty()
  // @IsString()
  readonly image_url: ImageUploadedData | string;

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

  @IsEmpty({ message: "You can not pass User id" })
  readonly owner: AuthUser;

};


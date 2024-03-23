import { ApiProperty } from "@nestjs/swagger";
import { USER_ROLE } from "../schema/users.schema";

export class UpdateUserDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly age: number;
  @ApiProperty()
  readonly logined: boolean;
  @ApiProperty()
  readonly role: USER_ROLE;

};
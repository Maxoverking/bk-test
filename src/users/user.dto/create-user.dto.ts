import { ApiProperty } from "@nestjs/swagger";
import { USER_ROLE } from "../schema/users.schema";

export class createUserDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly age: number;
  @ApiProperty()
  readonly logined: boolean;
  @ApiProperty({
    description: `User role: ADMIN, BOSS,USER`,
    minimum: 1,
    default: 'USER',
  })
  readonly role: USER_ROLE;

};


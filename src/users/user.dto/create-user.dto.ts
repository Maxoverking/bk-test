import { USER_ROLE } from "../schema/users.schema";

export class createUserDto {
  readonly name: string;
  readonly age: number;
  readonly logined: boolean;
  readonly role: USER_ROLE;

};


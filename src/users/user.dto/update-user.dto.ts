import { USER_ROLE } from "../schema/users.schema";

export class UpdateUserDto {
  readonly name: string;
  readonly age: number;
  readonly logined: boolean;
  readonly role: USER_ROLE;

};
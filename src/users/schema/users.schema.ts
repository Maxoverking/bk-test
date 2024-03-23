import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum USER_ROLE {
  USER = "USER",
  ADMIN = 'ADMIN',
  BOSS = 'BOSS'
}

@Schema({ timestamps: true, versionKey: false })
export class User {

  @Prop()
  name: string;
  @Prop()
  age: number;
  @Prop()
  logined: boolean;
  @Prop()
  role: USER_ROLE;

}
export const UserSchema = SchemaFactory.createForClass(User)
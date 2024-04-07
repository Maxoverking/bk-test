import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { AuthUser } from "src/auth/schema/auth.user.schema";

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
  name_en: string;
  @Prop()
  age: number;
  @Prop()
  logined: boolean;
  @Prop()
  role: USER_ROLE;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "AuthUser" })
  owner: AuthUser;

}
export const UserSchema = SchemaFactory.createForClass(User)
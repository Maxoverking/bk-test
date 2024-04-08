import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { AuthUser } from "src/auth/schema/auth.user.schema";
import { ImageUploadedData, } from "../image.upload.service";

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
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "AuthUser" })
  owner: AuthUser;
  @Prop({ type: Object })
  image_url: ImageUploadedData | string

}
export const UserSchema = SchemaFactory.createForClass(User)
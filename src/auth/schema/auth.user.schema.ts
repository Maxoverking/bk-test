import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true, versionKey: false })
export class AuthUser extends Document {

  @Prop()
  name: string;

  @Prop({ unique: [true, 'Email exsist'] })
  email: string;

  @Prop()
  password: string;


}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser)
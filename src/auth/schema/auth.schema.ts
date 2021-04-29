import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserEnum } from './../../global/enum/userType.enum';

@Schema()
class AuthEntity {
  @Prop({ type: String, required: true })
  accessToken: string;

  @Prop({ type: String, required: true })
  refreshToken: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'actorModel',
  })
  actor: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true, enum: UserEnum })
  actorModel: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthEntity);

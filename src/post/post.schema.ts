
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.schema';

export type postDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  userId: User;


}

export const PostSchema = SchemaFactory.createForClass(Post);

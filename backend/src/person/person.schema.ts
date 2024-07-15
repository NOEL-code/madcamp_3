import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Person {
  _id: Types.ObjectId; // _id 속성 추가

  @Prop({ type: Types.ObjectId, required: true })
  travelId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  profileImage: string;

  @Prop({ required: false })
  travelImage: string[];
}

export type PersonDocument = Person & Document;
export const PersonSchema = SchemaFactory.createForClass(Person);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class TravelImage {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;
}

export const TravelImageSchema = SchemaFactory.createForClass(TravelImage);

@Schema()
export class Person {
  _id: Types.ObjectId; // _id 속성 추가

  @Prop({ type: Types.ObjectId, required: true })
  travelId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  profileImage: string;

  @Prop({ type: [TravelImageSchema], default: [] })
  travelImage: TravelImage[];
}

export type PersonDocument = Person & Document;
export const PersonSchema = SchemaFactory.createForClass(Person);

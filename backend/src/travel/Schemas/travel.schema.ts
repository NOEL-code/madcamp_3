import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Json } from 'aws-sdk/clients/robomaker';
import { Document, Types } from 'mongoose';

@Schema()
export class Travel {
  _id: Types.ObjectId; // _id 속성 추가

  @Prop({ required: true })
  month: string;

  @Prop({ required: true })
  totalPeople: number;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  budget: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: [Types.ObjectId], ref: 'Person', required: true })
  people: Types.ObjectId[];

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  location: Json;

  @Prop({ type: Object }) // gptResponse를 객체 타입으로 추가
  gptResponse: Record<string, any>;

}

export type TravelDocument = Travel & Document;
export const TravelSchema = SchemaFactory.createForClass(Travel);
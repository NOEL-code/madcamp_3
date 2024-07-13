import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
}

export type TravelDocument = Travel & Document;
export const TravelSchema = SchemaFactory.createForClass(Travel);

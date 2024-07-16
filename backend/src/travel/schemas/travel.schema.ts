import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Person } from '../../person/person.schema';

@Schema()
export class Travel {
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

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Person' }] })
  people: Types.ObjectId[];

  @Prop({ required: true })
  country: string;

  @Prop({ required: true, type: Object })
  location: {
    label: string;
    name: string;
    lat: number;
    lng: number;
  };

  @Prop({ required: true })
  remainPhotoCount: number;

  @Prop({ type: Object })
  gptResponse: any;
}

export type TravelDocument = Travel & Document;
export const TravelSchema = SchemaFactory.createForClass(Travel);

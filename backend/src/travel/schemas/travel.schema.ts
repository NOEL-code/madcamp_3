import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Person, PersonSchema } from '../../person/person.schema';
import { Location, LocationSchema } from './location.schema';

@Schema()
export class Travel {
  _id: Types.ObjectId;

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

  @Prop({ type: [PersonSchema], default: [] }) // Embedded array of Person objects
  people: Person[];

  @Prop({ required: true })
  country: string;

  @Prop({ type: LocationSchema, required: true }) // Use Location schema
  location: Location;

  @Prop({ required: true })
  remainPhotoCount: number;

  @Prop({ type: Object }) // gptResponse를 객체 타입으로 추가
  gptResponse: Record<string, any>;
}

export type TravelDocument = Travel & Document;
export const TravelSchema = SchemaFactory.createForClass(Travel);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Person, PersonSchema } from './person.schema';

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

  @Prop({ type: [PersonSchema], required: true })
  people: Person[];
}

export type TravelDocument = Travel & Document;
export const TravelSchema = SchemaFactory.createForClass(Travel);

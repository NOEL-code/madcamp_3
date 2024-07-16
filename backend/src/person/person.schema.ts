import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true }) // Enable timestamps
export class Person {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  travelId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  profileImage: string;

  @Prop([
    {
      url: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ])
  travelImage: { url: string; createdAt: Date }[];
}

export type PersonDocument = Person & Document;
export const PersonSchema = SchemaFactory.createForClass(Person);

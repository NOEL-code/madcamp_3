import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class NoMatchPhoto {
  @Prop({ required: true, type: Types.ObjectId })
  travelId: Types.ObjectId;

  @Prop({ required: true })
  travelImage: string;
}

export type NoMatchPhotoDocument = NoMatchPhoto & Document;
export const NoMatchPhotoSchema = SchemaFactory.createForClass(NoMatchPhoto);

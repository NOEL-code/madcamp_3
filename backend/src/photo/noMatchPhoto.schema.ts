import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true }) // This will automatically add createdAt and updatedAt fields
export class NoMatchPhoto {
  @Prop({ type: Types.ObjectId, required: true })
  travelId: Types.ObjectId;

  @Prop({ required: true })
  travelImage: string;

  @Prop()
  createdAt: Date; // This field will be automatically managed by Mongoose
}

export type NoMatchPhotoDocument = NoMatchPhoto & Document;
export const NoMatchPhotoSchema = SchemaFactory.createForClass(NoMatchPhoto);

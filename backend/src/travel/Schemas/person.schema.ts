import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Person {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  image: string; // 이미지 URL을 저장할 필드
}

export type PersonDocument = Person & Document;
export const PersonSchema = SchemaFactory.createForClass(Person);
